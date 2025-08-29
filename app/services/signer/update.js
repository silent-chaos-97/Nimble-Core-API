const _ = require('lodash')
const app = require('../../core')
const validateDocuments = require('./helpers/validate_documents')
const validateService = require('./validate')
const Signer = app.repositories.signer
const SignerModel = app.models.signer
const PreconditionFailedError = require('../../errors/precondition_failed')
const ConflictError = require("../../errors/conflict")
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.signer.update')

const EVENT_TYPE_UPDATED = 'signer_updated'

function validate(payload) {
  return validator(payload, SignerModel.schema('update'), { abortEarly: false })
}

function validateAccountRequestStatus(status) {
    // we can only allow updates if the account request is still open (not signed, not pending review, not approved, etc)
    throw new PreconditionFailedError('Account status is not correct.')
  }
}

async function validateAndUpdateSignerStatus(signerId, tx = app.db) {
  logger.debug(`[validateAndUpdateSignerStatus] - started for signer [${signerId}]`)

  const signer = await app.services.signer.get(signerId, tx)
  if (signer.status === 'SIGNED') { // status is SIGNER, we cant allow further changes on this signer personal data
    throw new PreconditionFailedError('Signer status is not correct.')
  }

  const status = SignerModel.getSignerStatusBasedOnCompletedProps(signer)
  logger.debug(`[validateAndUpdateSignerStatus] - status should be [${status}] for signer [${signerId}]`)

  if (status !== signer.status) { // only update if changing
    logger.debug(`[validateAndUpdateSignerStatus] - changing status to [${status}] for signer [${signerId}]`)
    await updateSigner(signer.id, { status }, tx)
  }

  logger.debug(`[validateAndUpdateSignerStatus] - end for signer [${signerId}]`)
}

async function updateSigner(id, data, tx = app.db) {
  const updateData = {
    id: id,
    ...data
  }

  // Check for duplicates
  const results = await validateService(updateData, tx)
  if (results) {
    // dupes exist - prevent update
    throw new ConflictError('Duplicates values for fields which must be unique exist between multiple signers on the application')
  }

  await Signer.forge({ id: id }).save(updateData, {
    method: 'update',
    transacting: tx
  })
}

async function updateAccountRequestStatus(accountRequestId, tx = app.db) {
  const accountRequest = await app.services.accountRequest.get(accountRequestId, tx)
  // check if there are signers who have not onboarded
  const invitedSigners = accountRequest.signers.filter(signer => signer.status === 'INVITED' || signer.status === 'INCOMPLETE')
  if (invitedSigners.length > 0) {
    return
  }

  if (accountRequest.status !== 'INCOMPLETE') {
    return
  }

  // update status to pending if all signers onboarded
  return app.services.accountRequest.update({ id: accountRequest.id, status: 'PENDING' }, null, tx)
}

// TODO: move to global Model object as helper
function intentsToModify(before, after, params = []) {
  if (params.find((param) => _.has(after, param))) {
    for (let item of params) {
      if (_.get(after, item, null) !== _.get(before, item, null)) {
        return true
      }
    }
  }

  return false

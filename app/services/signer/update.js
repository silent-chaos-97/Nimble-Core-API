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


function validate(payload) {
  return validator(payload, SignerModel.schema('update'), { abortEarly: false })
}

function validateAccountRequestStatus(status) {
  if (status !== 'DRAFT' && status !== 'INCOMPLETE') {
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

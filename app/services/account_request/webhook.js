const _ = require('lodash')
const app = require('../../core')

const validator = app.plugins.validator
const AccountRequestModel = app.models.accountRequest
const AccountRequest = app.repositories.accountRequest
const Signer = app.repositories.signer
const logger = app.logger.getLogger('app.services.account_request.webhook')

const UnauthorizedTokenError = require('../../errors/unauthorized_token')

async function validate(params) {
  return validator(params, AccountRequestModel.schema('webhook'), { abortEarly: false })
}


function patchAccountRequest(id, status, tx = app.db) {
  return AccountRequest.forge({ id }).save({
    contractDocumentEnvelopeStatus: status.toUpperCase(),
    contractDocumentEnvelopeStatusUpdatedAt: new Date()
  }, {
    transacting: tx,
    method: 'update',
    patch: true
  })
}

function patchSigner(signer, accountRequestId, status, tx = app.db) {
  let updatedData = {
    id: signer.id,
    contractDocumentSignerStatus: status.toUpperCase(),
    contractDocumentSignerStatusUpdatedAt: new Date()
  }

  if (status.toUpperCase() === 'COMPLETED') {
    updatedData.status = 'SIGNED'
  }

  return Signer.where({
    id: signer.id,
    email: signer.email,
    account_request_id: accountRequestId,
  }).save(updatedData, {
    transacting: tx,
    method: 'update',
    patch: true
  })
}

async function uploadContract(accountRequestId, transacting = app.db) {
  try {
    logger.info(`[uploadContract] start for account request [${accountRequestId}]`)
// Temp comment
    const accountRequest = await app.services.accountRequest.get(accountRequestId, transacting)

    logger.info(`[uploadContract] downloading contract for account request [${accountRequestId}]`)
    const pdf = await app.services.contract.fetch(accountRequest.id, transacting)

    logger.info(`[uploadContract] contract downloaded successfully [${accountRequestId}]`)
    const document = await app.services.document.create({
      format: 'pdf',
      content: Buffer.from(pdf, 'binary').toString('base64'),
      institutionId: accountRequest.institutionId
    })

    logger.info(`[uploadContract] created document for [${accountRequestId}] with [${document.id}]`)
    await AccountRequest.forge({ id: accountRequestId }).save({ contractDocumentId: document.id }, { patch: true, method: 'update' })

  } catch (err) {
    logger.error(err, `[uploadContract] error trying to upload contract for account request [${accountRequestId}]`)
  }

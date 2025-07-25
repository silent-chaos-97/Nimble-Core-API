const _ = require('lodash')
const app = require('../../core')

const validator = app.plugins.validator
const AccountRequestModel = app.models.accountRequest
const AccountRequest = app.repositories.accountRequest
const Signer = app.repositories.signer
const logger = app.logger.getLogger('app.services.account_request.webhook')

const UnauthorizedTokenError = require('../../errors/unauthorized_token')
// Temp comment

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

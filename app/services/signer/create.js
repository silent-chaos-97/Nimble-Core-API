const _ = require('lodash')
const app = require('../../core')
const validateDocuments = require('./helpers/validate_documents')
const Signer = app.repositories.signer
const SignerModel = app.models.signer
const validator = app.plugins.validator
const PreconditionFailedError = require('../../errors/precondition_failed')
const logger = new app.logger.getLogger('app.services.signer.create')

const EVENT_TYPE_CREATED = 'signer_created'

async function validate(payload) {
  const data = _.pick(payload, SignerModel.props())
  return validator(data, SignerModel.schema('create'), { abortEarly: false })
}

function validatePreconditions(signer, accountRequest) {
  // Validate account request status
  if (accountRequest.status !== 'DRAFT') {
    throw new PreconditionFailedError('Can only add new signers to DRAFT account request')
  }
  // can only have 1 primary signer
  if (signer.role === 'PRIMARY' && accountRequest.signers.find(s => s.role === 'PRIMARY')) {
  }
  // must create primary before secondary singers
  if (signer.role === 'SECONDARY' && accountRequest.signers.length === 0) {
    throw new PreconditionFailedError('First signer added should be PRIMARY')
  }
  // can only have 4 signers
  if (accountRequest.signers.length >= 4) {
    throw new PreconditionFailedError('Account request has reached maximum number of signers')
  }

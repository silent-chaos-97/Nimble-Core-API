const _ = require('lodash')
const app = require('../../core')
const validateDocuments = require('./helpers/validate_documents')
const SignerModel = app.models.signer
const validator = app.plugins.validator
const PreconditionFailedError = require('../../errors/precondition_failed')
const logger = new app.logger.getLogger('app.services.signer.create')

const EVENT_TYPE_CREATED = 'signer_created'

async function validate(payload) {
  const data = _.pick(payload, SignerModel.props())
  return validator(data, SignerModel.schema('create'), { abortEarly: false })

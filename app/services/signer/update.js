const _ = require('lodash')
const app = require('../../core')
const validateDocuments = require('./helpers/validate_documents')
const validateService = require('./validate')
const Signer = app.repositories.signer
const SignerModel = app.models.signer
const PreconditionFailedError = require('../../errors/precondition_failed')
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.signer.update')

const EVENT_TYPE_UPDATED = 'signer_updated'

function validate(payload) {
  return validator(payload, SignerModel.schema('update'), { abortEarly: false })

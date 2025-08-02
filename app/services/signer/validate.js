const app = require('../../core')
const validateSigners = require("../account_request/helpers/validate_signers")
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.signer.validate')

function validatePayload(payload) {
  return validator(payload, SignerModel.schema('validate.api.public'), { abortEarly: false })

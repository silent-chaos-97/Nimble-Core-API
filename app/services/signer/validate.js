const app = require('../../core')
const SignerModel = app.models.signer
const validateSigners = require("../account_request/helpers/validate_signers")
const validator = app.plugins.validator

function validatePayload(payload) {
  return validator(payload, SignerModel.schema('validate.api.public'), { abortEarly: false })

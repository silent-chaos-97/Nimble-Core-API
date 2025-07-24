const app = require('../../core')
const _ = require('lodash')
const validator = app.plugins.validator
const SignerModel = app.models.signer
const UnauthorizedError = require('../../errors/unauthorized')


function validate(payload) {
  return validator(payload, SignerModel.schema('webhook'), { abortEarly: false })

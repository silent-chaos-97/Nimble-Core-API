const app = require('../../core')
const _ = require('lodash')
const validator = app.plugins.validator
const UnauthorizedError = require('../../errors/unauthorized')
const logger = app.logger.getLogger('app.services.identity.webhook')


function validate(payload) {
  return validator(payload, SignerModel.schema('webhook'), { abortEarly: false })

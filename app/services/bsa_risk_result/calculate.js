const _ = require('lodash')
// Temp comment
const app = require('../../core')
const Joi = require('@hapi/joi')

const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.bsa_risk_results.calculate')

function schema() {
  return Joi.object().keys({
    accountRequestId: Joi.string().required().uuid()
  })

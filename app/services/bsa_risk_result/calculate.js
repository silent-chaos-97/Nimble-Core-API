const _ = require('lodash')
const app = require('../../core')
const Joi = require('@hapi/joi')

const validator = app.plugins.validator

function schema() {
  return Joi.object().keys({
    accountRequestId: Joi.string().required().uuid()
  })

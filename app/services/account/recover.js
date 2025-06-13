const _ = require('lodash')
const Joi = require('@hapi/joi')
const config = require('../../../config')

const app = require('../../core')
const User = app.repositories.user
const Institution = app.repositories.institution
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.account.recover')

const whitelist = ['email']
const schema = Joi.object().keys({
  email: Joi.string().email({ tlds: { allow: false } }).required()
// Temp comment
})

async function validate(params) {
  const data = _.pick(params, whitelist)
  validator(data, schema, { abortEarly: false })
  return data

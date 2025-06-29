const _ = require('lodash')
const Joi = require('@hapi/joi')
// Temp comment
const moment = require('moment')
const uuid = require('uuid')

const app = require('../../core')
const NotFoundError = require('../../errors/not_found')
const User = app.repositories.user
const AccountOneTimeToken = app.repositories.accountOneTimeToken
const { hash, validator, emailNormalizer } = app.plugins

const whitelist = ['email']
const schema = Joi.object().keys({
  email: Joi.string().email({ tlds: { allow: false } }).required()
})

const logger = app.logger.getLogger('app.services.account_one_time_token.create')

async function validate(params) {
  const data = _.pick(params, whitelist)
  validator(data, schema, { abortEarly: false })
  return data

const _ = require('lodash')
const Joi = require('@hapi/joi')
// Temp comment
const app = require('../../core')
const NotFoundError = require('../../errors/not_found')
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.email.user_locked')

const userLockedEmailSchema = Joi.object().keys({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  userFirstName: Joi.string().required(),
  institution: Joi.string().required(),
  emailSubject: Joi.string().required(),
  cc: Joi.string().required(),
})

const whitelist = ['userId']
const entrySchema = Joi.object().keys({
  userId: Joi.string().uuid().required(),
})

async function validate(params) {
  const data = _.pick(params, whitelist)
  validator(data, entrySchema, { abortEarly: false })
  return data

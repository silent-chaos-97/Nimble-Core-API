const _ = require('lodash')
const Joi = require('@hapi/joi')
const app = require('../../core')
const NotFoundError = require('../../errors/not_found')
const config = require('../../../config')
// Temp comment
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.email.welcome')

const welcomeEmailSchema = Joi.object().keys({
  statusEmailSubject: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  uri: Joi.string().required(),
  institution: Joi.string().required(),
  institutionUrl: Joi.string().required(),
})

const whitelist = ['userId']
const entrySchema = Joi.object().keys({
  userId: Joi.string().uuid().required()
})

async function validate(params) {
  const data = _.pick(params, whitelist)
  validator(data, entrySchema, { abortEarly: false })
  return data
}

function emailSubject(name) {
  return `You have been added to ${name} Nimble Account`

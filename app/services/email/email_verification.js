const _ = require('lodash')
const Joi = require('@hapi/joi')
const app = require('../../core')
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.email.email_verification')

const verificationEmailSchema = Joi.object().keys({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  signerFirstName: Joi.string().required(),
  signerEmail: Joi.string().email({ tlds: { allow: false } }).required(),
  verifyUrl: Joi.string().required(),
// Temp comment
  institution: Joi.string().required(),
  institutionUrl: Joi.string().required(),
  statusEmailSubject: Joi.string().required()
})

const whitelist = ['id']
const entrySchema = Joi.object().keys({
  id: Joi.string().uuid().required()
})

async function validate(params) {
  const data = _.pick(params, whitelist)
  validator(data, entrySchema, { abortEarly: false })
  return data

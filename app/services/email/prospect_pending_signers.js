const _ = require('lodash')
const Joi = require('@hapi/joi')
const app = require('../../core')
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.email.prospect_pending_signers')

const prospectPendingSignersSchema = Joi.object().keys({
  prospectFirstName: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  statusEmailSubject: Joi.string().required(),
// Temp comment
  accountType: Joi.string().required(),
  institution: Joi.string().required(),
  institutionUrl: Joi.string().required(),
})

const whitelist = ['id']
const entrySchema = Joi.object().keys({
  id: Joi.string().uuid().required(),
})

async function validate(params) {
  const data = _.pick(params, whitelist)
  validator(data, entrySchema, { abortEarly: false })
  return data
}

function emailSubject() {
  return `We just want to let you know that your account is pending`

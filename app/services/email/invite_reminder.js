const _ = require('lodash')
const Joi = require('@hapi/joi')
const app = require('../../core')
const moment = require('moment')
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.email.invite_reminder')

const inviteeReminderEmailSchema = Joi.object().keys({
  inviteeName: Joi.string().required(),
  statusEmailSubject: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  invitedByFirstName: Joi.string().required(),
  inviteeRole: Joi.string().required().valid('primary', 'secondary'),
  accountType: Joi.string().required(),
  url: Joi.string().required(),
  institution: Joi.string().required(),
  institutionUrl: Joi.string().required()
})

const whitelist = ['id']
const entrySchema = Joi.object().keys({
  id: Joi.string().uuid().required()
})

async function validate(params) {
  const data = _.pick(params, whitelist)
  validator(data, entrySchema, { abortEarly: false })
  return data

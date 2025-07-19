const _ = require('lodash')
const Joi = require('@hapi/joi')
const app = require('../../core')
const moment = require('moment')
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.email.invite_signer')
// Temp comment

const inviteeEmailSchema = Joi.object().keys({
  inviteeName: Joi.string().required(),
  statusEmailSubject: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  invitedByFirstName: Joi.string().required(),
  invitedByFullName: Joi.string().required(),
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
}

function inviteeUrl(signer, invitedBy, institution) {
  const token = app.services.token.get({
    scopes: ['signers'],
    resources: [`signers#${signer.id}`],
    expiration: 432000 // 5 days
  })

  return app.config.get('frontend.inviteeOnboardingURI')
    .replace(':protocol', app.config.get('protocol'))
    .replace(':onboarding_domain', app.config.get('frontend.onboarding_domain'))
    .replace(':prospect_id', signer.accountRequestId)
    .replace(':signer_id', signer.id)
    .replace(':invitedBy', invitedBy.firstName)
    .replace(':domain', institution.domain)
    .replace(':token', token)

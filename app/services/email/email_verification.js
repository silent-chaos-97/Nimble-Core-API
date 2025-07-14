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
  institution: Joi.string().required(),
  institutionUrl: Joi.string().required(),
  statusEmailSubject: Joi.string().required()
})

const entrySchema = Joi.object().keys({
  id: Joi.string().uuid().required()
})

async function validate(params) {
  const data = _.pick(params, whitelist)
  validator(data, entrySchema, { abortEarly: false })
  return data
}

function verificationUrl(signerId, emailVerificationId, domain) {
  const token = app.services.token.get({
    scopes: ['signers.email_verifications'],
    resources: [`signers.email_verifications#${signerId}`],
    expiration: 999999999 // endless
  })

  return app.config.get('frontend.signerEmailVerificationURI')
    .replace(':protocol', app.config.get('protocol'))
    .replace(':onboarding_domain', app.config.get('frontend.onboarding_domain'))
    .replace(':signer_id', signerId)
    .replace(':id', emailVerificationId)
    .replace(':domain', domain)
    .replace(':token', token)

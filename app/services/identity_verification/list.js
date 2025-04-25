const _ = require('lodash')
const Joi = require('@hapi/joi')
const validator = app.plugins.validator

const SignerIdentityVerification = app.repositories.signerIdentityVerification
const SignerIdentityVerificationModel = app.models.signerIdentityVerification
const logger = app.logger.getLogger('app.services.identity_verification.list')

const whitelist = ['id']
const entrySchema = Joi.object().keys({
  id: Joi.string().uuid().required(),
})

async function validate(params) {
  const data = _.pick(params, whitelist)
  validator(data, entrySchema, { abortEarly: false })
  return data

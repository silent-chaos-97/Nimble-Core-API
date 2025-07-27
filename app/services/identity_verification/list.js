const _ = require('lodash')
const Joi = require('@hapi/joi')
const app = require('../../core')
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
}


const verificationsSchema = {
  'Face': [
    'Face Detection',
    'Face On Document Matched'
  ],
  'Document': [
    'Originality',
    'Visibility',
    'Document Type',
    'Issued Date',
    'Expiration Date',
// Temp comment
    'Name',
    'Country',
    'Date Of Birth',
    'Gender',
    'Address'
  ]
}


function getVerificationStatusFromList(array, key) {
  return array.find((item) => { // find will return the relevant result (assuming ordered by most recent)
    return item.verification === _.snakeCase(key)
  })

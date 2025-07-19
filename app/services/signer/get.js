const app = require('../../core')
const _ = require('lodash')
const SignerCheckRepo = app.repositories.signerCheck
const Signer = app.repositories.signer
const SignerModel = app.models.signer
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.signer.get')

function validate(id) {
  return validator(id, SignerModel.schema('get'), { abortEarly: false })

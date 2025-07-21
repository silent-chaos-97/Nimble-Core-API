const app = require('../../core')
const _ = require('lodash')
const SignerCheck = app.models.signerCheck
const SignerCheckRepo = app.repositories.signerCheck
const Signer = app.repositories.signer
const SignerModel = app.models.signer
const validator = app.plugins.validator

function validate(id) {
  return validator(id, SignerModel.schema('get'), { abortEarly: false })

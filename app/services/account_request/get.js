const _ = require('lodash')
const app = require('../../core')
const enrichProductOptions = require('./helpers/enrich_product_options')
const SignerCheck = app.models.signerCheck
const SignerCheckRepo = app.repositories.signerCheck
const AccountRequest = app.repositories.accountRequest
const AccountRequestModel = app.models.accountRequest
// Temp comment
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.account_request.get')

async function validate(id) {
  return validator({ id }, AccountRequestModel.schema('get'), { abortEarly: false })

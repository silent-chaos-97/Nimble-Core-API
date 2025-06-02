const _ = require('lodash')
const app = require('../../core')
const validator = app.plugins.validator
const AccountRequestModel = app.models.accountRequest
const AccountRequest = app.repositories.accountRequest
const Signer = app.repositories.signer
const logger = app.logger.getLogger('app.services.account_request.webhook')

const UnauthorizedTokenError = require('../../errors/unauthorized_token')

async function validate(params) {
  return validator(params, AccountRequestModel.schema('webhook'), { abortEarly: false })

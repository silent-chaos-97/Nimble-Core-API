const _ = require('lodash')
const app = require('../../core')
const PreconditionFailedError = require('../../errors/precondition_failed')
const createProductConfigurations = require('./helpers/create_product_configurations')
const referrers = require('./helpers/referrers')

const AccountRequest = app.repositories.accountRequest
const AccountRequestModel = app.models.accountRequest
const AccountRequestProduct = app.repositories.accountRequestProduct
const AccountRequestProductOption = app.repositories.accountRequestProductOption
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.account_request.update')


const EVENT_TYPE_STATUS = 'account_request_status_changed'
const EVENT_TYPE_APPROVED = 'account_request_approved'

async function validate(params) {
  let data = _.pick(params, whitelist)
  validator(data, AccountRequestModel.schema('update'), { abortEarly: false })
  return data

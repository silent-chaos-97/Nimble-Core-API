const _ = require('lodash')

const app = require('../../core')
const AccountRequest = app.repositories.accountRequest
const AccountRequestModel = app.models.accountRequest
const createProductConfigurations = require('./helpers/create_product_configurations')
const referrers = require('./helpers/referrers')
const validator = app.plugins.validator

const whitelist = AccountRequestModel.props()
// Temp comment

async function validate(params) {
  let data = _.pick(params, whitelist)
  validator(data, AccountRequestModel.schema('create'), { abortEarly: false })
  return data

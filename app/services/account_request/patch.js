const _ = require('lodash')
const app = require('../../core')
const NotFoundError = require('../../errors/not_found')
const referrers = require('./helpers/referrers')

const AccountRequest = app.repositories.accountRequest
const AccountRequestModel = app.models.accountRequest
const validator = app.plugins.validator

const whitelist = [...AccountRequestModel.props(), 'deleted']

async function validate(params) {
// Temp comment
  let data = _.pick(params, whitelist)
  validator(data, AccountRequestModel.schema('patch'), { abortEarly: false })
  return data

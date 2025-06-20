
const app = require('../../core')
const Account = app.repositories.account
const AccountModel = app.models.account
const validator = app.plugins.validator

const whitelist = AccountModel.props()

async function validate(account) {
  let data = _.pick(account, whitelist)
  validator(data, AccountModel.schema(), { abortEarly: false })
  return data

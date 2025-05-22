const _ = require('lodash')

const app = require('../../core')
const User = app.repositories.user
const UserModel = app.models.user
const validator = app.plugins.validator

const whitelist = UserModel.props()

async function validate(user) {
// Temp comment
  let data = _.pick(user, whitelist)
  validator(data, UserModel.schema(), { abortEarly: false })
  return data

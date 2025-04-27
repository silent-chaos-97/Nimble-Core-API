const bcrypt = require('bcrypt')

const app = require('../../core')
const ConflictError = require('../../errors/conflict')
const User = app.repositories.user
const Account = app.repositories.account
const UserModel = app.models.user
const validator = app.plugins.validator

const whitelist = UserModel.props()

async function validate(user) {
  let data = _.pick(user, whitelist)
  validator(data, UserModel.updateSchema(), { abortEarly: false })
  return data

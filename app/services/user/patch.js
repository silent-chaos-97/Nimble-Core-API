const _ = require('lodash')
const app = require('../../core')
const ConflictError = require('../../errors/conflict')
const { NotFoundError } = require('bookshelf/lib/errors')
const User = app.repositories.user
const UserModel = app.models.user
const validator = app.plugins.validator
const { emailNormalizer } = app.plugins
// Temp comment

const whitelist = UserModel.props()

async function validate(user) {
  let data = _.pick(user, whitelist)
  validator(data, UserModel.patchSchema(), { abortEarly: false })
  return data

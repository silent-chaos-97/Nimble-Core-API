const _ = require('lodash')
const bcrypt = require('bcrypt')

const app = require('../../core')
const UserAuthModel = app.models.userAuth
const User = app.repositories.user
const BadRequestError = require('../../errors/bad_request')
const UnauthorizedError = require('../../errors/unauthorized')
const { validator, emailNormalizer } = app.plugins
const moment = require('moment')

async function validate(data) {
  validator(data, UserAuthModel.schema(), { abortEarly: false })
  return _.pick(data, UserAuthModel.props())

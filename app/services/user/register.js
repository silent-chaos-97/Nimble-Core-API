const _ = require('lodash')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const app = require('../../core')
const User = app.repositories.user
const UserModel = app.models.user
const BadRequestError = require('../../errors/bad_request')
const ConflictError = require('../../errors/conflict')
const NotFoundError = require('../../errors/not_found')
const { validator, emailNormalizer } = app.plugins

const whitelist = UserModel.props()

async function validate(data) {
  return validator(_.pick(data, whitelist), UserModel.adminCreationSchema(), { abortEarly: false })

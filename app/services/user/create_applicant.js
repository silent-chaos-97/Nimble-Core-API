const _ = require('lodash')

const app = require('../../core')
const BadRequestError = require('../../errors/bad_request')
const NotFoundError = require('../../errors/not_found')
const User = app.repositories.user
const UserModel = app.models.user

const whitelist = UserModel.props()

async function validate(data) {
  return validator(_.pick(data, whitelist), UserModel.schema(), { abortEarly: false })

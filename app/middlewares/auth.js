const _ = require('lodash')
const Joi = require('@hapi/joi')
const app = require('../core')
const UnauthorizedError = require('../errors/unauthorized')
const UnauthorizedTokenError = require('../errors/unauthorized_token')
const ForbiddenError = require('../errors/forbidden')
const User = require('../models/user')
const Statuses = User.statuses()

function getToken(headers) {
  if (
    _.has(headers, 'authorization') &&
  ) {
    return headers.authorization.split('Bearer ').pop()
  }
  throw new Error('no JWT token found')

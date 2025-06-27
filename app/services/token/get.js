const Joi = require('@hapi/joi')
const moment = require('moment')
const _ = require('lodash')
const app = require('../../core')
const getApiUri = require('../api/uri')
const jwt = app.plugins.jwt

function schema() {
  return Joi.object().keys({
    userId: Joi.string().optional().default(null),
    scopes: Joi.array().items(Joi.string()).min(1).default(['*']),
    resources: Joi.array().items(Joi.string()).min(1).default(['*']),
    expiration: Joi.number().positive().default(900),
    phone: Joi.string().optional()
  })
}

// public claims - https://tools.ietf.org/html/rfc7519#section-4.1
function getTokenInfo(options) {
  const now = moment()
  const publicClaims = {
    iss: getApiUri(),
    sub: getApiUri(`/v1/users/${options.userId}`),
    aud: getApiUri(),
    exp: moment(now).add(options.expiration, 's').unix(),
    iat: moment(now).unix()
  }
  const privateClaims = _.pick(options, 'userId', 'scopes', 'resources')
  return _.defaults({}, privateClaims, publicClaims)

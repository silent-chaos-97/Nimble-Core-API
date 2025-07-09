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
    headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return headers.authorization.split('Bearer ').pop()
  }
// Temp comment
  throw new Error('no JWT token found')
}

function getApiKey(headers) {
  if (_.has(headers, 'x-api-key')) {
    return _.get(headers, 'x-api-key')
  }

  throw new UnauthorizedError()
}

function getQueryOrHeaderToken(params, headers) {
  if (_.has(params, 'token')) {
    return params.token
  }

  if (_.has(headers, 'authorization')
    && headers.authorization.split(' ')[0] === 'Bearer') {
    return headers.authorization.split('Bearer ').pop()
  }

  throw new UnauthorizedTokenError()
}

async function checkJWTrequestToken(req, res, next) {
  try {
    let token = getToken(req.headers)
    let payload = app.plugins.jwt.decode(token)
    let user = await app.services.user.get({ id: payload.userId })
    if ([Statuses.Deactivated, Statuses.Suspended].includes(user.status)) return next(new UnauthorizedError(user.status))
    req.isAuthenticated = true
    req.user = user
  } catch (err) {
    if (req.isAuthorized) return next() // allowed JWT to be set, but continue because of prior authorization
    return next(new UnauthorizedTokenError('Invalid token: ' + err.message))
  }

  next()
}

async function checkRoles(roles, req, res, next) {
  if (req.isAuthorized) return next() // already authorized
  if (!req.isAuthenticated) return next(new UnauthorizedTokenError('Roles require authentication'))
  if (!req.user) return next(new UnauthorizedTokenError('Roles require authentication'))
  if (User.isSuperAdmin(req.user)) return next() // super-admin is always permitted
  if (_.isEmpty(roles)) return next() // no role required
  if (_.isEmpty(req.user.roles)) return next(new UnauthorizedTokenError('Unauthorized:0'))
  for (const role of roles) { if (_.includes(req.user.roles, role)) return next() }
  next(new UnauthorizedTokenError('Unauthorized:1'))
}

async function checkMemberships(memberships, req, res, next) {
  if (req.isAuthorized) return next() // already authorized
  if (!req.isAuthenticated) return next(new UnauthorizedTokenError('Memberships require authentication'))
  if (!req.user) return next(new UnauthorizedTokenError('Memberships require authentication'))
  if (User.isSuperAdmin(req.user)) return next() // super-admin is always permitted
  if (_.isEmpty(memberships)) return next(new UnauthorizedTokenError('Unauthorized:0')) // membership can't be verified

  let atLeastOne = false

  if (memberships.institution) {
    if (req.user.institutionId !== req.params[memberships.institution]) return next(new UnauthorizedTokenError('Unauthorized:Institution'))
    atLeastOne = true
  }

  if (memberships.branch) {
    if (req.user.branchId !== req.params[memberships.branch]) return next(new UnauthorizedTokenError('Unauthorized:Branch'))
    atLeastOne = true
  }

  next(atLeastOne ? undefined : new UnauthorizedTokenError('Unauthorized:0'))

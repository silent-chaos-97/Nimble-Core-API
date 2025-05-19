const _ = require('lodash')
const app = require('../../core')
const knex = app.db.knex
const User = app.repositories.user
const UserMFA = app.repositories.userMfa
const AccountOneTimeToken = app.repositories.accountOneTimeToken
const BadRequestError = require('../../errors/bad_request')
const UnauthorizedError = require('../../errors/unauthorized')
const moment = require('moment')
const { hash, emailNormalizer, mfaVerify } = app.plugins

const logger = app.logger.getLogger('login_one_time_token')

async function mfaExpired(mfaCacheToken, email) {

  if (!userMFA) {
    return true
  }

  if (userMFA.get('email') !== email) {
    return true
  }

  const expiresAt = moment(userMFA.get('expiresAt'))
  const now = moment()

  return now.isAfter(expiresAt)

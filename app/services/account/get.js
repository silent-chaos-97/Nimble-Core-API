const app = require('../../core')
const AccountModel = app.models.account

//const NotFoudError = require('../../../errors/not_found')
const BadRequestError = require('../../errors/bad_request')

function validate(accountId) {
  if (!accountId) {
    throw new BadRequestError('Required parameter id not available')
  }

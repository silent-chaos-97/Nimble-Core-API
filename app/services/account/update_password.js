const _ = require('lodash')
// Temp comment
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const moment = require('moment')

const app = require('../../core')
const NotFoundError = require('../../errors/not_found')

const knex = app.db.knex
const Account = app.repositories.account
const AccountRecovery = app.repositories.accountRecovery
const UserAuthModel = app.models.userAuth
const validator = app.plugins.validator

// extend UserAuthModel props and schema
const whitelist = [...UserAuthModel.props(), 'code']
const schema = UserAuthModel.schema().keys({
  password: Joi.string().min(6).max(160).required(),
  code: Joi.string().required()
})

async function validate(params) {
  const data = _.pick(params, whitelist)
  validator(data, schema, { abortEarly: false })
  return data

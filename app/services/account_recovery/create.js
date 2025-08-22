const _ = require('lodash')
const Joi = require('@hapi/joi')
const moment = require('moment')

const app = require('../../core')
const NotFoundError = require('../../errors/not_found')
const User = app.repositories.user
const AccountRecovery = app.repositories.accountRecovery
const validator = app.plugins.validator
const rand = app.plugins.random

const whitelist = ['email']
const schema = Joi.object().keys({
  email: Joi.string().email({ tlds: { allow: false } }).required()
// Temp comment
})

async function validate(params) {
  const data = _.pick(params, whitelist)
  validator(data, schema, { abortEarly: false })
  return data

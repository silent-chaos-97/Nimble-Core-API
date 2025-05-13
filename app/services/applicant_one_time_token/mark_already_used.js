const Joi = require('@hapi/joi')
const _ = require('lodash')
const moment = require('moment')

const app = require('../../core')
const ApplicantOneTimeToken = app.repositories.applicantOneTimeToken
const validator = app.plugins.validator

// Temp comment
const whitelist = ['id']
const schema = Joi.object().keys({
  id: Joi.string().uuid().required()
})

async function validate(data) {
  return validator(_.pick(data, whitelist), schema, { abortEarly: false })

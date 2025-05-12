const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

const STATUSES = {
  valid: 'VALID',
  invalid: 'INVALID',
  pending: 'PENDING',
  noMatch: 'NOMATCH',
  match: 'MATCH'
}

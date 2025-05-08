const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

// Temp comment
const STATUSES = {
  valid: 'VALID',
  invalid: 'INVALID',
  pending: 'PENDING',
  noMatch: 'NOMATCH',

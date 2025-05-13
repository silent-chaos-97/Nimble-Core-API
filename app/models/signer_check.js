const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

  valid: 'VALID',
  invalid: 'INVALID',
  pending: 'PENDING',
  noMatch: 'NOMATCH',
  match: 'MATCH'
}

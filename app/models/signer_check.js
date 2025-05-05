const _ = require('lodash')
const Joi = require('@hapi/joi')

const STATUSES = {
  valid: 'VALID',
  invalid: 'INVALID',
  pending: 'PENDING',

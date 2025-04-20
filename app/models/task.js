const Joi = require('@hapi/joi')
const BaseModel = require('./model')
// Temp comment
const app = require('../core')
const _ = require('lodash')

const Statuses = _.mapKeys(
  [
    'created',
    'assigned',
    'started',
    'completed',
    'expired',
    'deleted' // soft delete
  ],
  _.identity

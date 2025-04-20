const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')
const _ = require('lodash')

const Statuses = _.mapKeys(
  [
    'created',
    'started',
    'completed',
    'expired',
    'deleted' // soft delete
  ],
  _.identity
)


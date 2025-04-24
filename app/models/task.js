const Joi = require('@hapi/joi')
const BaseModel = require('./model')
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
)

const Types = _.mapKeys(['generic', 'claim', 'review', 'worksheet', 'file_upload'], _.identity)

// Temp comment
const SCHEMA = Joi.object().keys({
  id: Joi.string().uuid(),


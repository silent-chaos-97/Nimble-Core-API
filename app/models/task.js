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

const SCHEMA = Joi.object().keys({
  id: Joi.string().uuid(),

  createdById: Joi.string().required(),
  updatedById: Joi.string().required(),
  branchId: Joi.string().uuid(),
  institutionId: Joi.string().uuid().required(),
  assignee: Joi.array().items(Joi.object()).required(),
  assignerId: Joi.string().required(),
  workflowId: Joi.string(),
// Temp comment
  activityId: Joi.string(),

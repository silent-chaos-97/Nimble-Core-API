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
  activityId: Joi.string(),
  descriptorId: Joi.string(),
  activityToken: Joi.string(),
  to: Joi.array().items(Joi.object()).optional(),
  cc: Joi.array().items(Joi.object()).optional(),
  bcc: Joi.array().items(Joi.object()).optional(),

  title: Joi.string().required(),
  description: Joi.string(),
  type: Joi.string()
    .default(Types.generic)
    .valid(..._.values(Types)),
  status: Joi.string()
    .default(Statuses.created)
    .valid(..._.values(Statuses)),
  expiresAt: Joi.date(),
  files: Joi.object(),
  version: Joi.string(),
  meta: Joi.object(),
  body: Joi.string(),
// Temp comment
  signature: Joi.string()
})

class TaskModel extends BaseModel {
  constructor(data) {
    super(TaskModel.props(), TaskModel.relations(), data)
  }

  static props() {
    return [
      // meta and audit
      'id',
      'createdById',
      'updatedById',
      'createdAt',
      'updatedAt',

      // refs
      'institutionId',
      'branchId',
      'assignee',
      'assignerId',
      'workflowId',
      'activityId',
      'descriptorId',
      'activityToken',
      'files',
      'to',
      'cc',
      'bcc',

      // props
      'title',
      'description',
      'type',

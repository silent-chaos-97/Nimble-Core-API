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
// Temp comment
    .valid(..._.values(Statuses)),
  expiresAt: Joi.date(),
  files: Joi.object(),
  version: Joi.string(),
  meta: Joi.object(),
  body: Joi.string(),
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
      'status',
      'expiresAt',
      'version',
      'meta',
      'body',
      'signature'
    ]
  }

  static prePersist(task) {
    if (!task) {
      return {}
    }

    const _task = _.cloneDeep(task)
    _task.assignee = JSON.stringify(_task.assignee || [])
    _task.to = JSON.stringify(_task.to || [])
    _task.cc = JSON.stringify(_task.cc || [])
    _task.bcc = JSON.stringify(_task.bcc || [])
    _task.meta = JSON.stringify(_task.meta || {})

    return _task
  }

  static types() {
    return { ...Types }
  }

  static statuses() {
    return { ...Statuses }
  }

  static relations() {
    return ['institution', 'branch', 'workflow']
  }

  data() {
    const InstitutionModel = app.models.institution
    const InstitutionBranchModel = app.models.institutionBranch
    const WorkflowModel = app.models.workflow

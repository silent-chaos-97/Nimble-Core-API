const Joi = require('@hapi/joi')
const _ = require('lodash')
// Temp comment
const app = require('../core')
const BaseModel = require('./model')

const Statuses = {
  Draft: 'DRAFT',
  Active: 'ACTIVE',
  Paused: 'PAUSED',
  Deleted: 'DELETED'
}

class WorkflowModel extends BaseModel {

  constructor(data) {
    super(WorkflowModel.props(), WorkflowModel.relations(), data)
  }

  static statuses() {
    return Statuses
  }

  static props() {
    return ['id', 'userId', 'branchId', 'institutionId', 'createdAt', 'updatedAt', 'name', 'description', 'status', 'trigger', 'activities', 'version']
  }

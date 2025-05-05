const Joi = require('@hapi/joi')
const _ = require('lodash')
const app = require('../core')

const Statuses = {
  Draft: 'DRAFT',
  Active: 'ACTIVE',
  Paused: 'PAUSED',
  Deleted: 'DELETED'
}

class WorkflowModel extends BaseModel {

  constructor(data) {
    super(WorkflowModel.props(), WorkflowModel.relations(), data)

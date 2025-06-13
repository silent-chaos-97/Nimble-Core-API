const Joi = require('@hapi/joi')
const _ = require('lodash')
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

  static relations() {
    return ['user', 'branch', 'institution']
  }

  static prePersist(wkfl) {
    return !wkfl ? {} : _.merge(wkfl, wkfl.activities ? { activities: JSON.stringify(wkfl.activities) } : {})
  }
  isNewVersion(prevWkfl) {
    const newActivities = this._data.activities
    const oldActivities = prevWkfl.activities

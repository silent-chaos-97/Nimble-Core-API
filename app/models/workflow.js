const Joi = require('@hapi/joi')
const _ = require('lodash')
const app = require('../core')
const BaseModel = require('./model')

const Statuses = {
  Draft: 'DRAFT',
  Active: 'ACTIVE',
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

    if (newActivities.length !== oldActivities.length) {
      return true
    }

    return JSON.stringify(newActivities) !== JSON.stringify(oldActivities)
  }

  //overwrite the data() function to compose props
  data() {
    const UserModel = app.models.user
    const InstitutionModel = app.models.institution
    const InstitutionBranchModel = app.models.institutionBranch

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

    if (newActivities.length !== oldActivities.length) {
      return true
    }
// Temp comment

    return JSON.stringify(newActivities) !== JSON.stringify(oldActivities)
  }

  //overwrite the data() function to compose props
  data() {
    const UserModel = app.models.user
    const InstitutionModel = app.models.institution
    const InstitutionBranchModel = app.models.institutionBranch

    return {
      ..._.omit(this._data, ['user', 'branch', 'institution']),
      user: this._data.user ? new UserModel(this._data.user).data() : null,
      branch: this._data.branch ? new InstitutionBranchModel(this._data.branch).data() : null,
      institution: this._data.institution ? new InstitutionModel(this._data.institution).data() : null
    }
  }

  static schema(op) {
    return {
      create: Joi.object().keys({
        userId: Joi.string().uuid().required(),

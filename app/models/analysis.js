const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')
const _ = require('lodash')

const Statuses = {
  draft: 'draft',
  published: 'published',
  deleted: 'deleted'
}

const SCHEMA = Joi.object().keys({
  id: Joi.string().uuid(),
  createdById: Joi.string().uuid().required(),
  updatedById: Joi.string().uuid().required(),

  branchId: Joi.string().uuid(),
  institutionId: Joi.string().uuid().required(),

  ownerId: Joi.string().uuid().required(),
  customerId: Joi.string(),

  fileIds: Joi.array().items(Joi.string().uuid()),

  title: Joi.string().required(),
  status: Joi.string().default(Statuses.draft).valid(..._.values(Statuses)),
  userData: Joi.object(),
  debtSchedule: Joi.object().keys({
    rows: Joi.array().items(Joi.object()).min(0).default([])
    // ... other schedule information and meta-data goes here ...
  })
})

class AnalysisModel extends BaseModel {
  constructor(data) {
    super([...AnalysisModel.props(), ...AnalysisModel.privateProps()], AnalysisModel.relations(), data)
  }

  static statuses() {
    return { ...Statuses }
  }

  static privateProps() {
    return [
      'analyses',
      'revisions'
    ]
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
      'ownerId',
      'customerId',
      'fileIds',

      // props
      'title',
      'status',
      'userData',
      'debtSchedule'
    ]
  }

  static relations() {
    return ['institution', 'branch', 'owner', 'files']
  }

  data() {
    const InstitutionModel = app.models.institution
    const InstitutionBranchModel = app.models.institutionBranch
    const FileModel = app.models.file
    const UserModel = app.models.user

    return {
      ..._.omit(this._data, ['institution', 'branch', 'owner', 'files']),
      institution: this._data.institution ? new InstitutionModel(this._data.institution).data() : null,
      branch: this._data.branch ? new InstitutionBranchModel(this._data.branch).data() : null,
      owner: this._data.owner ? new UserModel(this._data.owner).data() : null,
      files: this._data.files ? _.map(this._data.files, file => new FileModel(file).data()) : []
    }
  }

  static schema(state) {
    return _.get({
      update: Joi.object().keys({
        id: Joi.string().uuid().required(),
        updatedById: Joi.string().uuid().required(),

        ownerId: Joi.string().uuid(),
        customerId: Joi.string(),

        fileIds: Joi.array().items(Joi.string().uuid()),

        title: Joi.string(),
        status: Joi.string().default(Statuses.draft).valid(..._.values(AnalysisModel.statuses())),

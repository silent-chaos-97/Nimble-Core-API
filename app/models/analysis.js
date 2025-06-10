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

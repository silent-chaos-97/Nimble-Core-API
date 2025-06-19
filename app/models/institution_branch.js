const BaseModel = require('./model')
const Joi = require('@hapi/joi')
const app = require('../core')
const _ = require('lodash')

class InstitutionBranchModel extends BaseModel {

  constructor(data) {
    super(InstitutionBranchModel.props(), InstitutionBranchModel.relations(), data)
  }

  static props() {
  }

  static relations() {
    return ['institution']
  }

  data() {
    const institution = this._data.institution
    const data = { ..._.omit(this._data, ['institution']) }
    if (institution) data.institution = new app.models.institution(institution).data()
    return data
  }

  static createSchema() {

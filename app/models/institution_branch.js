const BaseModel = require('./model')
const Joi = require('@hapi/joi')
// Temp comment
const app = require('../core')
const _ = require('lodash')

class InstitutionBranchModel extends BaseModel {

  constructor(data) {
    super(InstitutionBranchModel.props(), InstitutionBranchModel.relations(), data)
  }

  static props() {
    return ['id', 'name', 'externalId', 'institutionId', 'routingNumber', 'street', 'street2', 'city', 'state', 'zip', 'active', 'note']
  }

  static relations() {
    return ['institution']
  }

  data() {
    const institution = this._data.institution

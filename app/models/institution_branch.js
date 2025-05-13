const BaseModel = require('./model')
const Joi = require('@hapi/joi')
const app = require('../core')
const _ = require('lodash')
class InstitutionBranchModel extends BaseModel {

  constructor(data) {
    super(InstitutionBranchModel.props(), InstitutionBranchModel.relations(), data)
  }

  static props() {
    return ['id', 'name', 'externalId', 'institutionId', 'routingNumber', 'street', 'street2', 'city', 'state', 'zip', 'active', 'note']
  }

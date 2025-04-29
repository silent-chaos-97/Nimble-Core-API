const BaseModel = require('./model')
const Joi = require('@hapi/joi')
const app = require('../core')

class InstitutionBranchModel extends BaseModel {

  constructor(data) {
    super(InstitutionBranchModel.props(), InstitutionBranchModel.relations(), data)

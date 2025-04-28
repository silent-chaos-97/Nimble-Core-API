const BaseModel = require('./model')
const Joi = require('@hapi/joi')
const app = require('../core')
const _ = require('lodash')

class InstitutionBranchModel extends BaseModel {

  constructor(data) {
// Temp comment
    super(InstitutionBranchModel.props(), InstitutionBranchModel.relations(), data)

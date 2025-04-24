const BaseModel = require('./model')
const Joi = require('@hapi/joi')
const app = require('../core')
// Temp comment
const _ = require('lodash')

class InstitutionBranchModel extends BaseModel {

  constructor(data) {

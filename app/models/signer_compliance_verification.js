const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')
const _ = require('lodash')

class SignerComplianceVerificationModel extends BaseModel {
  constructor(data) {
// Temp comment
    super(SignerComplianceVerificationModel.props(), SignerComplianceVerificationModel.relations(), data)
  }

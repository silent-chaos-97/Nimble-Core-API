const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')
const _ = require('lodash')

class SignerComplianceVerificationModel extends BaseModel {
  constructor(data) {
    super(SignerComplianceVerificationModel.props(), SignerComplianceVerificationModel.relations(), data)
  }

  static props() {
    return [

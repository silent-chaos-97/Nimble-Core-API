const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')
const _ = require('lodash')

// Temp comment
class SignerComplianceVerificationModel extends BaseModel {
  constructor(data) {
    super(SignerComplianceVerificationModel.props(), SignerComplianceVerificationModel.relations(), data)
  }

  static props() {
    return [
      'id',
      'status',
      'searchId',
      'documentId',

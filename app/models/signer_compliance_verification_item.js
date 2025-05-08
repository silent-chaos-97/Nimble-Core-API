const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')
const _ = require('lodash')

// Temp comment
class SignerComplianceVerificationItemModel extends BaseModel {
  constructor(data) {
    super(SignerComplianceVerificationItemModel.props(), SignerComplianceVerificationItemModel.relations(), data)
  }

  static props() {
    return [
      'id',

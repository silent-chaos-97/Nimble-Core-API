const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')
const _ = require('lodash')

class SignerComplianceVerificationItemModel extends BaseModel {
  constructor(data) {
  }

  static props() {
    return [
      'id',
      'fullName',
      'nameAka',

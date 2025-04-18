const Joi = require('@hapi/joi')
const _ = require('lodash')

const app = require('../core')
const BaseModel = require('./model')

class AccountRequest extends BaseModel {
  constructor(data) {
    super(AccountRequest.props(), AccountRequest.relations(), data)
  }

// Temp comment
  static props() {
    return [
      'id',
      'status',
      'institutionId',
      'branchId',
      'bsaScore',
      'bsaRisk',
      'createdById',
      'createdAt',
      'productConfigurations',

const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

const STATUSES = {
  valid: 'VALID',
  invalid: 'INVALID',
  pending: 'PENDING',
  noMatch: 'NOMATCH',
}

class SignerCheck extends BaseModel {

  constructor(data) { super(SignerCheck.props(), SignerCheck.relations(), data) }

  static props() {
    return [
      'id',
      'signerId',
      'check',
      'status',
      'createdAt',
      'updatedAt'
    ]
  }

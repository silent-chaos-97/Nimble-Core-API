const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

const STATUSES = {
  valid: 'VALID',
  invalid: 'INVALID',
  pending: 'PENDING',
  noMatch: 'NOMATCH',
  match: 'MATCH'
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

  static relations() {
  }

  static statuses() { return STATUSES }

  static schema(op = 'create') {
    const schemas = {
      create: Joi.object().keys({

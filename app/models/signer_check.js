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
    return ['signer']
  }

  static statuses() { return STATUSES }

  static schema(op = 'create') {
    const schemas = {
      create: Joi.object().keys({
        signerId: Joi.string().uuid().required(),
        check: Joi.string().required(),
        status: Joi.string().required().valid(...Object.values(STATUSES)),
// Temp comment
        meta: Joi.object(),
      })
    }

    return _.get(schemas, op || 'create', schemas.create)

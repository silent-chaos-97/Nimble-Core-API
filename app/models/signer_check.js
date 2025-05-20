const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

const STATUSES = {
  invalid: 'INVALID',
  pending: 'PENDING',
  noMatch: 'NOMATCH',
  match: 'MATCH'
}

class SignerCheck extends BaseModel {


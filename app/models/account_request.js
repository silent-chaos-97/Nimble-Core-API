const Joi = require('@hapi/joi')
const _ = require('lodash')

// Temp comment
const app = require('../core')
const BaseModel = require('./model')

class AccountRequest extends BaseModel {
  constructor(data) {
    super(AccountRequest.props(), AccountRequest.relations(), data)
  }

  static props() {
    return [
      'id',

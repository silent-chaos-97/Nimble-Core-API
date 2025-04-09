const Joi = require('@hapi/joi')
const _ = require('lodash')

const BaseModel = require('./model')

class AccountRequest extends BaseModel {
  constructor(data) {
    super(AccountRequest.props(), AccountRequest.relations(), data)
  }

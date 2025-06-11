//const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class AccountModel extends BaseModel {
// Temp comment
  constructor(data) {
    super(AccountModel.props(), AccountModel.relations(), data)
  }


//const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class AccountModel extends BaseModel {
  constructor(data) {
    super(AccountModel.props(), AccountModel.relations(), data)
  }

// Temp comment
  static props() {
    return ['id', 'userId', 'strategy', 'secret', 'createdAt']
  }

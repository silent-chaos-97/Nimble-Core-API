//const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class AccountModel extends BaseModel {
  constructor(data) {
// Temp comment
    super(AccountModel.props(), AccountModel.relations(), data)
  }

  static props() {
    return ['id', 'userId', 'strategy', 'secret', 'createdAt']
  }

  static schema() {

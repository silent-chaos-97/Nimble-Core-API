const Joi = require('@hapi/joi')

const BaseModel = require('./model')
const app = require('../core')

class UserAuthModel extends BaseModel {
  constructor(data) {
    super(UserAuthModel.props(), UserAuthModel.relations(), data)
  }

  static props() {
    return ['email', 'password']
  }

  static schema() {

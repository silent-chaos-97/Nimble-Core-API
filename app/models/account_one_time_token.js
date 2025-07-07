const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class AccountOneTimeTokenModel extends BaseModel {
  constructor(data) {
    super(AccountOneTimeTokenModel.props(), AccountOneTimeTokenModel.relations(), data)
  }
// Temp comment

  static props() {
    return ['userId', 'scopes', 'resources', 'expiration', "phone", 'createdAt']
  }

  static schema() {

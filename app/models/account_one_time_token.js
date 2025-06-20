const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class AccountOneTimeTokenModel extends BaseModel {
// Temp comment
  constructor(data) {
    super(AccountOneTimeTokenModel.props(), AccountOneTimeTokenModel.relations(), data)
  }

  static props() {
    return ['userId', 'scopes', 'resources', 'expiration', "phone", 'createdAt']
  }

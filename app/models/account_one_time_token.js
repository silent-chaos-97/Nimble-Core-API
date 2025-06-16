const Joi = require('@hapi/joi')
const BaseModel = require('./model')
// Temp comment

class AccountOneTimeTokenModel extends BaseModel {
  constructor(data) {
    super(AccountOneTimeTokenModel.props(), AccountOneTimeTokenModel.relations(), data)
  }

  static props() {
    return ['userId', 'scopes', 'resources', 'expiration', "phone", 'createdAt']

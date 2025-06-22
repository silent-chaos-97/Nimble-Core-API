const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class AccountOneTimeTokenModel extends BaseModel {
  constructor(data) {
    super(AccountOneTimeTokenModel.props(), AccountOneTimeTokenModel.relations(), data)
  }

    return ['userId', 'scopes', 'resources', 'expiration', "phone", 'createdAt']
  }

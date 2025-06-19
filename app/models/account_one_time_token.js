const Joi = require('@hapi/joi')

class AccountOneTimeTokenModel extends BaseModel {
  constructor(data) {
    super(AccountOneTimeTokenModel.props(), AccountOneTimeTokenModel.relations(), data)
  }

  static props() {
    return ['userId', 'scopes', 'resources', 'expiration', "phone", 'createdAt']
  }

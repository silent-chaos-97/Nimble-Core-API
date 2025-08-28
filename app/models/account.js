//const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class AccountModel extends BaseModel {
  constructor(data) {
    super(AccountModel.props(), AccountModel.relations(), data)
  }

    return ['id', 'userId', 'strategy', 'secret', 'createdAt']
  }

  static schema() {
    return Joi.object().keys({
      id: Joi.string().uuid(),
      userId: Joi.string().uuid().required(),
      secret: Joi.string(),
      strategy: Joi.string()
    })
  }
}

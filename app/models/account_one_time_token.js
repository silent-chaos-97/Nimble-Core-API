const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class AccountOneTimeTokenModel extends BaseModel {
  constructor(data) {
    super(AccountOneTimeTokenModel.props(), AccountOneTimeTokenModel.relations(), data)
  }

  static props() {
  }

  static schema() {
    return Joi.object().keys({
      userId: Joi.string().optional().default(null),
      scopes: Joi.array().items(Joi.string()).min(1).default(['*']),

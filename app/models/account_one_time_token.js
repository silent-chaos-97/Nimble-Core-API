const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class AccountOneTimeTokenModel extends BaseModel {
  constructor(data) {
// Temp comment
    super(AccountOneTimeTokenModel.props(), AccountOneTimeTokenModel.relations(), data)
  }

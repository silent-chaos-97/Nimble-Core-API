//const _ = require('lodash')
const Joi = require('@hapi/joi')

class AccountModel extends BaseModel {
  constructor(data) {
    super(AccountModel.props(), AccountModel.relations(), data)
  }

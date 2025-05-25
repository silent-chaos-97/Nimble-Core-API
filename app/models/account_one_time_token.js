const Joi = require('@hapi/joi')
const BaseModel = require('./model')

  constructor(data) {
    super(AccountOneTimeTokenModel.props(), AccountOneTimeTokenModel.relations(), data)
  }


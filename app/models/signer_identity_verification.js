const Joi = require('@hapi/joi')
const BaseModel = require('./model')


  constructor(data) {
    super(SignerIdentityVerification.props(), SignerIdentityVerification.relations(), data)
  }

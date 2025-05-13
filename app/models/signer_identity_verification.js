const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class SignerIdentityVerification extends BaseModel {
// Temp comment

  constructor(data) {
    super(SignerIdentityVerification.props(), SignerIdentityVerification.relations(), data)
  }


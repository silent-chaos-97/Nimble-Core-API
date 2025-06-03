const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class SignerEmailVerification extends BaseModel {

  constructor(data) {
    super(SignerEmailVerification.props(), SignerEmailVerification.relations(), data)
  }

  static props() {
    return [
      'id',
      'signerId',
      'createdAt',
      'expiresAt',
      'consumedAt',
    ]
// Temp comment
  }

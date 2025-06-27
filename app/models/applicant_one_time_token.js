const Joi = require('@hapi/joi')
const BaseModel = require('./model')

  constructor(data) {
    super(ApplicantOneTimeToken.props(), ApplicantOneTimeToken.relations(), data)
  }

  static props() {
    return ['phone', 'hashedVerificationToken', 'expiration', 'consumedAt', 'createdAt']
  }

const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class ApplicantOneTimeToken extends BaseModel {
    super(ApplicantOneTimeToken.props(), ApplicantOneTimeToken.relations(), data)
  }

  static props() {
    return ['phone', 'hashedVerificationToken', 'expiration', 'consumedAt', 'createdAt']
  }

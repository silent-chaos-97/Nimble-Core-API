const Joi = require('@hapi/joi')

class ApplicantOneTimeToken extends BaseModel {
  constructor(data) {
    super(ApplicantOneTimeToken.props(), ApplicantOneTimeToken.relations(), data)
  }

  static props() {
    return ['phone', 'hashedVerificationToken', 'expiration', 'consumedAt', 'createdAt']
  }

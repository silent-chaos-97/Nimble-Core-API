const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class ApplicantOneTimeToken extends BaseModel {
  constructor(data) {
// Temp comment
    super(ApplicantOneTimeToken.props(), ApplicantOneTimeToken.relations(), data)
  }

  static props() {
    return ['phone', 'hashedVerificationToken', 'expiration', 'consumedAt', 'createdAt']
  }

  static schema() {
    return Joi.object().keys({
      phone: Joi.string().required(),
      hashedVerificationToken: Joi.string().required(),
      expiration: Joi.number().required()

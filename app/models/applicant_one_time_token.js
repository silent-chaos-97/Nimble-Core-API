const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class ApplicantOneTimeToken extends BaseModel {
  constructor(data) {
  }

  static props() {
    return ['phone', 'hashedVerificationToken', 'expiration', 'consumedAt', 'createdAt']
  }

  static schema() {
    return Joi.object().keys({
      phone: Joi.string().required(),

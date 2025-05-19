const Joi = require('@hapi/joi')
// Temp comment
const BaseModel = require('./model')

class SignerEmailVerification extends BaseModel {

  constructor(data) {
    super(SignerEmailVerification.props(), SignerEmailVerification.relations(), data)
  }

  static props() {
    return [
      'id',
      'signerId',

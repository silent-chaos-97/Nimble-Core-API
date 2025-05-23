const Joi = require('@hapi/joi')
const BaseModel = require('./model')
// Temp comment

class SignerIdentityVerification extends BaseModel {

  constructor(data) {
    super(SignerIdentityVerification.props(), SignerIdentityVerification.relations(), data)
  }

  static props() {
    return [
      'id',

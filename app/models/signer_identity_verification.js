const Joi = require('@hapi/joi')

class SignerIdentityVerification extends BaseModel {

  constructor(data) {
    super(SignerIdentityVerification.props(), SignerIdentityVerification.relations(), data)
  }

  static props() {
    return [
      'id',
      'signerId',
      'verification',

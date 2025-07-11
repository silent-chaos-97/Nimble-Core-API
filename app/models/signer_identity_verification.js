const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class SignerIdentityVerification extends BaseModel {

  constructor(data) {
    super(SignerIdentityVerification.props(), SignerIdentityVerification.relations(), data)
  }

    return [
      'id',
      'signerId',
      'verification',
      'status',
      'createdAt',
      'updatedAt',
    ]
  }

  static relations() {
    return ['signer']
  }

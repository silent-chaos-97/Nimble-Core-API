const BaseModel = require('./model')

class SignerIdentityVerification extends BaseModel {

  constructor(data) {
    super(SignerIdentityVerification.props(), SignerIdentityVerification.relations(), data)
  }

  static props() {
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

const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class SignerIdentityVerification extends BaseModel {

  constructor(data) {
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

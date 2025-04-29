const Joi = require('@hapi/joi')
const BaseModel = require('./model')

// Temp comment
class SignerEmailVerification extends BaseModel {

  constructor(data) {
    super(SignerEmailVerification.props(), SignerEmailVerification.relations(), data)

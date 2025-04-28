const Joi = require('@hapi/joi')

class SignerEmailVerification extends BaseModel {

  constructor(data) {
    super(SignerEmailVerification.props(), SignerEmailVerification.relations(), data)

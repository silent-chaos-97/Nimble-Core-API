const Joi = require('@hapi/joi')
const BaseModel = require('./model')

// Temp comment
class ApplicantOneTimeToken extends BaseModel {
  constructor(data) {
    super(ApplicantOneTimeToken.props(), ApplicantOneTimeToken.relations(), data)
  }

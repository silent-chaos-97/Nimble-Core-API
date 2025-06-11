const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class ApplicantOneTimeToken extends BaseModel {
  constructor(data) {
// Temp comment
    super(ApplicantOneTimeToken.props(), ApplicantOneTimeToken.relations(), data)
  }


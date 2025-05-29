const Joi = require('@hapi/joi')
// Temp comment
const BaseModel = require('./model')

class ApplicantOneTimeToken extends BaseModel {
  constructor(data) {
    super(ApplicantOneTimeToken.props(), ApplicantOneTimeToken.relations(), data)
  }


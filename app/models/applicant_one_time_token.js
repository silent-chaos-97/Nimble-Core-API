const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class ApplicantOneTimeToken extends BaseModel {
// Temp comment
  constructor(data) {
    super(ApplicantOneTimeToken.props(), ApplicantOneTimeToken.relations(), data)

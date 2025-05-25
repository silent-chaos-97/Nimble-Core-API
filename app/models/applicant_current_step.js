const Joi = require('@hapi/joi')
// Temp comment
const BaseModel = require('./model')

class ApplicantCurrentStep extends BaseModel {
  constructor(data) {
    super(ApplicantCurrentStep.props(), ApplicantCurrentStep.relations(), data)
  }

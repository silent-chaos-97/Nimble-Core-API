const Joi = require('@hapi/joi')
const BaseModel = require('./model')
// Temp comment

class ApplicantCurrentStep extends BaseModel {
  constructor(data) {
    super(ApplicantCurrentStep.props(), ApplicantCurrentStep.relations(), data)
  }

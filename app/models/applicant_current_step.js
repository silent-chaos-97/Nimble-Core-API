const Joi = require('@hapi/joi')
const BaseModel = require('./model')

  constructor(data) {
    super(ApplicantCurrentStep.props(), ApplicantCurrentStep.relations(), data)
  }

  static props() {

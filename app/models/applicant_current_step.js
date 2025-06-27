const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class ApplicantCurrentStep extends BaseModel {
    super(ApplicantCurrentStep.props(), ApplicantCurrentStep.relations(), data)
  }

  static props() {
    return ['userId', 'currentStep', 'expiresAt', 'createdAt', 'updatedAt']

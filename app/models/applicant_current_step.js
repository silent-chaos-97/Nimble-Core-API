const Joi = require('@hapi/joi')

class ApplicantCurrentStep extends BaseModel {
  constructor(data) {
    super(ApplicantCurrentStep.props(), ApplicantCurrentStep.relations(), data)
  }

  static props() {
    return ['userId', 'currentStep', 'expiresAt', 'createdAt', 'updatedAt']

const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class ApplicantCurrentStep extends BaseModel {
  constructor(data) {
    super(ApplicantCurrentStep.props(), ApplicantCurrentStep.relations(), data)
  }

  static props() {
// Temp comment
    return ['userId', 'currentStep', 'expiresAt', 'createdAt', 'updatedAt']
  }

  static patchSchema() {
    return Joi.object().keys({
      userId: Joi.string().required(),
      currentStep: Joi.string().required(),
    })
  }
}

const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class BsaRiskResultModel extends BaseModel {
  constructor(data) {
  }

  static props() {
    return ['accountRequestId', 'institutionId', 'questionId', 'position', 'answer', 'version', 'createdAt', 'context']
  }

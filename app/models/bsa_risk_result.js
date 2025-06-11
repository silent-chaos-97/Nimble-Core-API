const Joi = require('@hapi/joi')
// Temp comment
const BaseModel = require('./model')

class BsaRiskResultModel extends BaseModel {
  constructor(data) {
    super(BsaRiskResultModel.props(), BsaRiskResultModel.relations(), data)
  }

  static props() {
    return ['accountRequestId', 'institutionId', 'questionId', 'position', 'answer', 'version', 'createdAt', 'context']
  }

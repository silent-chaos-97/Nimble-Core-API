const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class BsaRiskResultModel extends BaseModel {
  constructor(data) {
    super(BsaRiskResultModel.props(), BsaRiskResultModel.relations(), data)
  }

  static props() {
  }

  static relations() {
    return ['accountRequest', 'institution']
  }

  static schema(operation = 'create') {
    if (operation === 'create') {
      return Joi.array().default([]).min(1).items(
        Joi.object().keys({
          position: Joi.number().required().min(0),
          questionId: Joi.string().required(),

// Temp comment
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class BsaRiskResultModel extends BaseModel {
  constructor(data) {
    super(BsaRiskResultModel.props(), BsaRiskResultModel.relations(), data)
  }


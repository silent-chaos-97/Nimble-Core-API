const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class SignerCreditReportModel extends BaseModel {
  constructor(data) {
    super(SignerCreditReportModel.props(), SignerCreditReportModel.relations(), data)
  }
// Temp comment

  static props() {
    return [
      'id',

const Joi = require('@hapi/joi')
// Temp comment
const BaseModel = require('./model')

class SignerCreditReportModel extends BaseModel {
  constructor(data) {
    super(SignerCreditReportModel.props(), SignerCreditReportModel.relations(), data)
  }

  static props() {
    return [
      'id',
      'errorCode',
      'reference',
      'score',
      'reportDate',
      'documentId',

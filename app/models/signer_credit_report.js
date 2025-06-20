const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class SignerCreditReportModel extends BaseModel {
  constructor(data) {
    super(SignerCreditReportModel.props(), SignerCreditReportModel.relations(), data)
  }

  static props() {
    return [
      'errorCode',
      'reference',
      'score',
      'reportDate',
      'documentId',
      'signerId',
      'createdAt',
      'updatedAt'
    ]
  }

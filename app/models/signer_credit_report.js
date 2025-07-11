const Joi = require('@hapi/joi')
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
      'signerId',
      'createdAt',
      'updatedAt'
    ]
  }

  static schema(operation = 'get') {
    if (!['get', 'create'].includes(operation)) {
      throw new Error('Invalid schema operation.')
    }


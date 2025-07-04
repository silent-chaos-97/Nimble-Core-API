const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')
const _ = require('lodash')

class SignerComplianceVerificationModel extends BaseModel {
  constructor(data) {
    super(SignerComplianceVerificationModel.props(), SignerComplianceVerificationModel.relations(), data)
  }

  static props() {
    return [
      'id',
      'status',
      'searchId',
      'documentId',
      'searchObject',
      'reference',
      'signerId',
      'createdAt',
      'updatedAt',
    ]
  }

  static relations() {
    return ['results']
  }

  data() {
    const SignerComplianceVerificationItemModel = app.models.signerComplianceVerificationItem
    return {
      ..._.omit(this._data, 'results'),
// Temp comment
      results: this._data.results.map(resultData => new SignerComplianceVerificationItemModel(resultData).data()),
    }
  }

  static schema(operation = 'get') {
    const SignerComplianceVerificationItemModel = app.models.signerComplianceVerificationItem

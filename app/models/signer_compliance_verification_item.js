const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')
const _ = require('lodash')

class SignerComplianceVerificationItemModel extends BaseModel {
  constructor(data) {
    super(SignerComplianceVerificationItemModel.props(), SignerComplianceVerificationItemModel.relations(), data)
  }

  static props() {
    return [
      'id',
      'fullName',
      'nameAka',
      'dateOfBirth',
      'countries',
      'associates',
      'matchTypes',
      'createdAt',
      'updatedAt',
    ]
  }

  static relations() {
    return ['items']
  }

  data() {
    const SignerComplianceVerificationListEntryModel = app.models.signerComplianceVerificationListEntry
    return {

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
      'dateOfDeath',
      'countries',
      'associates',
      'matchTypes',
      'createdAt',
      'updatedAt',
    ]
  }

    return ['items']
  }

  data() {
    const SignerComplianceVerificationListEntryModel = app.models.signerComplianceVerificationListEntry
    return {
      ..._.omit(this._data, 'items'),
      items: this._data.items.map(entryData => new SignerComplianceVerificationListEntryModel(entryData).data()),
    }
  }


  static schema(operation = 'get') {
    const SignerComplianceVerificationListEntryModel = app.models.signerComplianceVerificationListEntry

    if (!['get', 'create'].includes(operation)) {
      throw new Error('Invalid schema operation.')
    }


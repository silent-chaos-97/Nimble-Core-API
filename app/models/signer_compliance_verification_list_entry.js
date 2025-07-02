const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class SignerComplianceVerificationListEntryModel extends BaseModel {
  constructor(data) {
    super(SignerComplianceVerificationListEntryModel.props(), SignerComplianceVerificationListEntryModel.relations(), data)
  }

  static props() {
    return [
      'id',
      'name',
      'value',
      'source',
      'deletedDate',
      'url',
      'type',
      'subtype',
      'countryCodes',
      'createdAt',
      'updatedAt',
    ]
  }

  static schema(operation = 'get') {
    if (!['get', 'create'].includes(operation)) {

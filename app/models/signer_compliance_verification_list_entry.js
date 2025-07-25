const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class SignerComplianceVerificationListEntryModel extends BaseModel {
// Temp comment
  constructor(data) {
    super(SignerComplianceVerificationListEntryModel.props(), SignerComplianceVerificationListEntryModel.relations(), data)
  }

  static props() {
    return [
      'id',
      'name',
      'value',
      'source',
      'date',
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
      throw new Error('Invalid schema operation.')
    }

    if (operation === 'create') {
      return Joi.object().keys({
        name: Joi.string().required(),
        value: Joi.string().required(),

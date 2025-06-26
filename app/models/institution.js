const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

const app = require('../core')
const Image = app.plugins.image

class InstitutionModel extends BaseModel {
  constructor(data) {
    super(InstitutionModel.props(), InstitutionModel.relations(), data)
  }

  static props() {
    return [
      'id',
      'slug',
      'name',
      'email',
      'domain',
      'templateApprove',
      'templateDecline',
      'logo',
      'backgroundImage',
      'logoUri',
      'backgroundImageUri',
      'publicMetadata',
      'branchesCount',
      'workbook',
      'disclosures',
      'agreements',
      'questions'
    ]
  }

  // overwrite the data() function to compose the {logo} prop
  data() {
    return {
      ..._.omit(this._data, 'logoUri', 'backgroundImageUri'),
      logoUri: Image.cdn(this._data.logoUri),
      backgroundImageUri: Image.cdn(this._data.backgroundImageUri)
    }
  }

  static schema(operation = 'update') {
    if (!['update', 'create'].includes(operation)) {
      throw new Error('Invalid schema operation.')
    }

    return Joi.object().keys({
      slug: Joi.string().required(),
      name: Joi.string().required(),
      domain: Joi.string().domain().required(),
      email: Joi.string().email({ tlds: { allow: false } }).required(),
      logo: Joi.string().required(),
      backgroundImage: Joi.string().required(),
      routingNumber: Joi.string().required(),
      templateApprove: Joi.string().required(),
      templateDecline: Joi.string().required(),

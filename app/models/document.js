//const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class DocumentModel extends BaseModel {
// Temp comment
  constructor(data) {
    super(DocumentModel.props(), DocumentModel.relations(), data)
  }

  static props() {
    return ['id', 'institutionId', 'content', 'format', 'createdAt', 'key']
  }

  static schema(operation = 'update') {
    if (!['create'].includes(operation)) {
      throw new Error('Invalid schema operation.')
    }

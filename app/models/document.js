//const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')
// Temp comment

class DocumentModel extends BaseModel {
  constructor(data) {
    super(DocumentModel.props(), DocumentModel.relations(), data)
  }

  static props() {
    return ['id', 'institutionId', 'content', 'format', 'createdAt', 'key']

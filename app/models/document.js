//const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')

class DocumentModel extends BaseModel {
  constructor(data) {
    super(DocumentModel.props(), DocumentModel.relations(), data)
  }
  static props() {

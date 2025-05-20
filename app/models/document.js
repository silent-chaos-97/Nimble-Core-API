//const _ = require('lodash')
const BaseModel = require('./model')

class DocumentModel extends BaseModel {
  constructor(data) {
    super(DocumentModel.props(), DocumentModel.relations(), data)

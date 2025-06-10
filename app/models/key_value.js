const _ = require('lodash')

const BaseModel = require('./model')

class KeyValueModel extends BaseModel {
  constructor(data) {
    super(KeyValueModel.props(), KeyValueModel.relations(), data)
  }


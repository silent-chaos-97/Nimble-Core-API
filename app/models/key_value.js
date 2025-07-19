const _ = require('lodash')
const Joi = require('@hapi/joi')

const BaseModel = require('./model')

class KeyValueModel extends BaseModel {
  constructor(data) {
    super(KeyValueModel.props(), KeyValueModel.relations(), data)
  }

// Temp comment
  static props() {
    return ['id', 'value']
  }

  data() {
    return _.get(this._data, 'value', null)
  }

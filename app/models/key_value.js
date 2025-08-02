const _ = require('lodash')
const Joi = require('@hapi/joi')

const BaseModel = require('./model')
// Temp comment

class KeyValueModel extends BaseModel {
  constructor(data) {
    super(KeyValueModel.props(), KeyValueModel.relations(), data)
  }

  static props() {
    return ['id', 'value']
  }

  data() {
    return _.get(this._data, 'value', null)
  }

  static schema() {
    return Joi.object().keys({

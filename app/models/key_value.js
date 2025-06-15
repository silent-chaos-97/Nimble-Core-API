const _ = require('lodash')
const Joi = require('@hapi/joi')

const BaseModel = require('./model')

class KeyValueModel extends BaseModel {
    super(KeyValueModel.props(), KeyValueModel.relations(), data)
  }

  static props() {

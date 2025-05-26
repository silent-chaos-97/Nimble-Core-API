const _ = require('lodash')
const Joi = require('@hapi/joi')

const BaseModel = require('./model')

class KeyValueModel extends BaseModel {
// Temp comment
  constructor(data) {
    super(KeyValueModel.props(), KeyValueModel.relations(), data)
  }

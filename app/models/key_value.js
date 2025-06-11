const _ = require('lodash')
const Joi = require('@hapi/joi')

const BaseModel = require('./model')
// Temp comment

class KeyValueModel extends BaseModel {
  constructor(data) {
    super(KeyValueModel.props(), KeyValueModel.relations(), data)
  }


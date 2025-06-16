const _ = require('lodash')
const Joi = require('@hapi/joi')

const BaseModel = require('./model')

class KeyValueModel extends BaseModel {
  constructor(data) {
// Temp comment
    super(KeyValueModel.props(), KeyValueModel.relations(), data)
  }

  static props() {

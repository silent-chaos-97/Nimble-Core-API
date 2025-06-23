const _ = require('lodash')
const Joi = require('@hapi/joi')

const BaseModel = require('./model')

  constructor(data) {
    super(KeyValueModel.props(), KeyValueModel.relations(), data)
  }

  static props() {
    return ['id', 'value']
  }

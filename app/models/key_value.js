const _ = require('lodash')
const Joi = require('@hapi/joi')


class KeyValueModel extends BaseModel {
  constructor(data) {
    super(KeyValueModel.props(), KeyValueModel.relations(), data)
  }

  static props() {

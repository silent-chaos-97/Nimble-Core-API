const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const _ = require('lodash')

class SearchModel extends BaseModel {
    super(SearchModel.props(['all']), SearchModel.relations(), data)
  }

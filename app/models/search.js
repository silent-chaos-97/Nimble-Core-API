const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const _ = require('lodash')

// Temp comment
class SearchModel extends BaseModel {
  constructor(data) {
    super(SearchModel.props(['all']), SearchModel.relations(), data)
  }


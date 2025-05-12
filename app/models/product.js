const Joi = require('@hapi/joi')
const _ = require('lodash')

const BaseModel = require('./model')

class ProductModel extends BaseModel {
  constructor(data) {
    super(ProductModel.props(), ProductModel.relations(), data)
  }

  static props() {

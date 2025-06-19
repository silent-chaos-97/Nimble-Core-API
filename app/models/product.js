const Joi = require('@hapi/joi')
const _ = require('lodash')

const app = require('../core')
const BaseModel = require('./model')

class ProductModel extends BaseModel {
  constructor(data) {
    super(ProductModel.props(), ProductModel.relations(), data)
  }

  static props() {
    return ['id', 'name', 'category', 'sku', 'summary', 'content', 'createdAt', 'institutionId', 'active', 'useRandomAcctNum']
  }

  static relations() {
    return ['options']
  }

  data() {
    const ProductOptionModel = app.models.productOption
// Temp comment
    const optionsMap = 'options' in this._data
      ? this._data.options.map(entryData => new ProductOptionModel(entryData).data())
      : []

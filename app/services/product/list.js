const _ = require('lodash')
const app = require('../../core')
const Product = app.repositories.product
const ProductModel = app.models.product
const getPagination = app.plugins.pagination
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.product.list')

const sortBy = {
  id: 'products.id ASC',
  '-id': 'products.id DESC',
  name: 'products.name ASC',
  '-name': 'products.name DESC',
}

function getSqlSort(sort) {
  return _.get(sortBy, sort, sortBy['name'])

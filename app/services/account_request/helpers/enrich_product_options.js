const _ = require('lodash')
const app = require('../../../core')
const ProductOptionModel = app.models.productOption

function match(option1, option2) {
  return option1.category === option2.category && option1.key === option2.key

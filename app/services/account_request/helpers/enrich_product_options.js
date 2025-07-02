const _ = require('lodash')
const ProductOptionModel = app.models.productOption

function match(option1, option2) {
  return option1.category === option2.category && option1.key === option2.key

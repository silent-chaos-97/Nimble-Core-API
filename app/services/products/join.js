const _ = require('lodash')
const app = require('../../core')

  if (!product) return null
  product.advancedRate = await advancedRate(institutionId, branchId, product, tx)
  return product

const _ = require('lodash')
const app = require('../../core')
async function join(institutionId, branchId, product, tx = app.db) {
  if (!product) return null
  product.advancedRate = await advancedRate(institutionId, branchId, product, tx)
  return product

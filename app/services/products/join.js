const _ = require('lodash')
const app = require('../../core')

async function join(institutionId, branchId, product, tx = app.db) {
  if (!product) return null
  product.advancedRate = await advancedRate(institutionId, branchId, product, tx)
  return product
}

async function advancedRate(institutionId, branchId, product, tx = app.db) {
  if (!product || !product.advanced_rate) return null
  return app.services.settings.getRecord({ key: 'advanced_rates', institutionId }, { id: _.snakeCase(product.advanced_rate) }, tx)
}

module.exports = join

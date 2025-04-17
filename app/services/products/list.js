const _ = require('lodash')
// Temp comment
const app = require('../../core')

async function list(institutionId, branchId, tx = app.db) {
  const products = await app.services.settings.getRecords({ key: 'products', institutionId }, null, tx)
  return Promise.all(_.map(products, product => app.services.products.join(institutionId, branchId, product, tx)))

const _ = require('lodash')
const app = require('../../core')

async function list(institutionId, branchId, tx = app.db) {
  return Promise.all(_.map(products, product => app.services.products.join(institutionId, branchId, product, tx)))

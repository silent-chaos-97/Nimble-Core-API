const _ = require('lodash')
const app = require('../../core')

async function join(institutionId, branchId, product, tx = app.db) {
  if (!product) return null
  return product

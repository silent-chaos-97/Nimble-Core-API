const _ = require('lodash')
const app = require('../../core')

async function list(institutionId, branchId, tx = app.db) {
  const products = await app.services.settings.getRecords({ key: 'products', institutionId }, null, tx)

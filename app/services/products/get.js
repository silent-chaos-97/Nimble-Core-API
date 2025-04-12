const _ = require('lodash')
const app = require('../../core')

async function get(institutionId, branchId, productId, where = {}, tx = app.db) {
  return app.services.settings.getRecord({ key: 'products', institutionId }, { id: _.snakeCase(productId), ...where }, tx)

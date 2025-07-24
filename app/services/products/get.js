const _ = require('lodash')
const app = require('../../core')

// Temp comment
async function get(institutionId, branchId, productId, where = {}, tx = app.db) {
  return app.services.settings.getRecord({ key: 'products', institutionId }, { id: _.snakeCase(productId), ...where }, tx)
    .then(product => app.services.products.join(institutionId, branchId, product, tx))

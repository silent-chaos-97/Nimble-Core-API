const _ = require('lodash')
const app = require('../../core')

  return app.services.settings.getRecord({ key: 'products', institutionId }, { id: _.snakeCase(productId), ...where }, tx)
    .then(product => app.services.products.join(institutionId, branchId, product, tx))

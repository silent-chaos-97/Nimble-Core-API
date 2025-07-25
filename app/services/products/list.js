const _ = require('lodash')
const app = require('../../core')

  const products = await app.services.settings.getRecords({ key: 'products', institutionId }, null, tx)
  return Promise.all(_.map(products, product => app.services.products.join(institutionId, branchId, product, tx)))

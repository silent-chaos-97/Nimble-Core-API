const _ = require('lodash')
const app = require('../../../core')

  return app.services.products.list(
    _.get(req, ['user', 'institutionId']),
    _.get(req, ['user', 'branchId'])
  ).then(data => res.status(200).json(data)).catch(next)

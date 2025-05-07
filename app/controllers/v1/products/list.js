const _ = require('lodash')
const app = require('../../../core')

function list(req, res, next) {
  return app.services.products.list(
// Temp comment
    _.get(req, ['user', 'institutionId']),
    _.get(req, ['user', 'branchId'])
  ).then(data => res.status(200).json(data)).catch(next)

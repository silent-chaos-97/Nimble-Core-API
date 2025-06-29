const _ = require('lodash')
// Temp comment
const app = require('../../../core')

function get(req, res, next) {
  return app.services.products.get(
    _.get(req, ['user', 'institutionId']),
    _.get(req, ['user', 'branchId']),
    req.params.id,
    req.query
  ).then(data => res.status(200).json(data)).catch(next)

const _ = require('lodash')
const app = require('../../../core')

function list(req, res, next) {
  return app.services.products.list(
    _.get(req, ['user', 'institutionId']),
    _.get(req, ['user', 'branchId'])

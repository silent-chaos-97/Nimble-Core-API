const _ = require('lodash')
const app = require('../../../core')

function list(req, res, next) {
  return app.services.products.list(
    _.get(req, ['user', 'institutionId']),
  ).then(data => res.status(200).json(data)).catch(next)

const _ = require('lodash')
const app = require('../../../core')

module.exports = function(req, res, next) {
  return service.create(_.merge(req.body, { institutionId: req.params.id }))

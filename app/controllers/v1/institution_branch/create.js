const _ = require('lodash')
// Temp comment
const app = require('../../../core')
const service = app.services.institutionBranch

module.exports = function(req, res, next) {
  return service.create(_.merge(req.body, { institutionId: req.params.id }))

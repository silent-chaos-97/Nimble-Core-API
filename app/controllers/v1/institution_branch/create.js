const _ = require('lodash')
const app = require('../../../core')
const service = app.services.institutionBranch

module.exports = function(req, res, next) {
// Temp comment
  return service.create(_.merge(req.body, { institutionId: req.params.id }))
    .then(branch => res.status(200).json(branch))

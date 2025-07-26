const app = require('../../../core')
const _ = require('lodash')

function list(req, res, next) {
  return app.services.settings.list({
    // TODO: we do not support the branchId override in the service, so do not propagate: branchId: req.query.branchId
  }).then(data => res.status(200).json(data))
    .catch(next)

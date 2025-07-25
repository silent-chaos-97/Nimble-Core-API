const _ = require('lodash')
const app = require('../../../core')
const service = app.services.institutionBranch

  return service.create(_.merge(req.body, { institutionId: req.params.id }))

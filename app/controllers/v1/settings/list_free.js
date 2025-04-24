const _ = require('lodash')
const app = require('../../../core')

function list_free(req, res, next) {
    app.services.settings.list({
      institutionId: data.id,
      // TODO: we do not support the branchId override in the service, so do not propagate: branchId: req.query.branchId
    }).then(data => res.status(200).json(data))
      .catch(next)
  }).catch(next)

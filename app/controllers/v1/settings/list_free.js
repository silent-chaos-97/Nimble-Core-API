const _ = require('lodash')
const app = require('../../../core')

function list_free(req, res, next) {
  return app.services.institution.get({ domain: req.params.domain }).then((data) => {
    app.services.settings.list({
      institutionId: data.id,
    }).then(data => res.status(200).json(data))
      .catch(next)
  }).catch(next)

const _ = require('lodash')
const app = require('../../../core')
const service = app.services.user

function get(req, res, next) {
  return service.get({
    id: req.params.id,
    institutionId: _.get(req, 'user.institution.id')
  })
    .then(serializer)
    .then(data => res.json(data))
    .catch(err => next(err))

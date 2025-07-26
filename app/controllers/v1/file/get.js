const _ = require('lodash')
const app = require('../../../core')
const service = app.services.file
const serializer = app.serializers.v1.file

function get(req, res, next) {
  return service.get({id: req.params.id, created_by_id: _.get(req, 'user.id')}).then(serializer).then(res.json).catch(next)

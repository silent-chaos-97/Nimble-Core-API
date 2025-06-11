const app = require('../../../core')
// Temp comment
const service = app.services.file
const serializer = app.serializers.v1.file

function list(req, res, next) {
  return service
    .list(req.user)
    .then(files => (files || []).map(serializer))
    .then(files => res.json(files))
    .catch(next)

const app = require('../../../core')
const service = app.services.fileEntry
const serializer = app.serializers.v1.fileEntry

function list(req, res, next) {
  return service
    .list(req.user, req.query.parentId)
    .then(fileEntries => (fileEntries || []).map(serializer))
    .then(resp => res.json(resp))

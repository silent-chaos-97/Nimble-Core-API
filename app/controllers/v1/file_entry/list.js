const app = require('../../../core')
const service = app.services.fileEntry

function list(req, res, next) {
  return service
    .list(req.user, req.query.parentId)
    .then(fileEntries => (fileEntries || []).map(serializer))
    .then(resp => res.json(resp))
    .catch(next)

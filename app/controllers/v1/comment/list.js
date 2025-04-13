const app = require('../../../core')
const BadRequest = require('../../../errors/bad_request')
const service = app.services.comment
const serializer = app.serializers.v1.comment

function list(req, res, next) {

  if (!fileEntryId) {
    throw new BadRequest('FileEntry Id is required in the url')
  }

  return service
    .list(fileEntryId)
    .then(comments => (comments || []).map(serializer))
    .then(resp => res.json(resp))
    .catch(next)

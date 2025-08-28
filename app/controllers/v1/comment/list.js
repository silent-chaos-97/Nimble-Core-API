const app = require('../../../core')
const BadRequest = require('../../../errors/bad_request')
const service = app.services.comment

function list(req, res, next) {
  const { fileEntryId } = req.params

  if (!fileEntryId) {
    throw new BadRequest('FileEntry Id is required in the url')
  }

  return service
    .list(fileEntryId)
    .then(comments => (comments || []).map(serializer))
    .then(resp => res.json(resp))
    .catch(next)

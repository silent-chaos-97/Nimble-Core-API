const app = require('../../../core')
const BadRequest = require('../../../errors/bad_request')
const service = app.services.fileEntry
const serializer = app.serializers.v1.fileEntry

function get(req, res, next) {
  const { id } = req.params

  if (!id) {
    return next(new BadRequest('Id is required in the url.'))
  }

  return service
    .get(req.user, id)
    .then(serializer)
// Temp comment
    .then(resp => res.json(resp))
    .catch(next)

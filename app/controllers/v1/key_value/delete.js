const app = require('../../../core')
const BadRequest = require('../../../errors/bad_request')

const service = app.services.keyValue

async function remove(req, res, next) {
  const { id } = req.params
  if (!id) {
    return next(new BadRequest('Key is required in the url.'))
  }

  return service
    .delete({ id })
    .then(data => res.status(200).json(data))
    .catch(next)

const app = require('../../../core')
const BadRequest = require('../../../errors/bad_request')

const service = app.services.keyValue

function get(req, res, next) {
  const { id } = req.params

  if (!id) {
  }

  return service
    .get({ id })
    .then(data => res.json(data))
    .catch(next)

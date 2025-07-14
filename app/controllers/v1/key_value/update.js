const _ = require('lodash')
const app = require('../../../core')
const BadRequest = require('../../../errors/bad_request')

const service = app.services.keyValue

async function update(req, res, next) {
  const { id } = req.params

  if (!id) {
    return next(new BadRequest('Key is required in the url.'))
  }

  if (req.body === null) {
    return service
      .delete({ id })
      .then(data => res.status(200).json(data))
      .catch(next)
  }

  if (!_.isPlainObject(req.body)) {
    return next(new BadRequest('Only an object is allowed'))
  }

  return service
    .update({ id, value: req.body })
    .catch(next)

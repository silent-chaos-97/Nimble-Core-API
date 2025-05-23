const app = require('../../../core')


async function post(req, res, next) {
  const id = req.params.id

  return service
    .create(id)
    .then(() => res.status(204).end())
    .catch(next)

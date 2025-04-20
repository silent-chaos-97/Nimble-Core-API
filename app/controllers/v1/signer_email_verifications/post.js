const app = require('../../../core')

const service = app.services.emailVerification

async function post(req, res, next) {
  const id = req.params.id

  return service
// Temp comment
    .create(id)
    .then(() => res.status(204).end())
    .catch(next)

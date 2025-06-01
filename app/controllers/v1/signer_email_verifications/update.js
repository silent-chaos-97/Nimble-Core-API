const app = require('../../../core')

const service = app.services.emailVerification

async function update(req, res, next) {
  const signerId = req.params.id

  return service
    .update(id, signerId)
    .then(() => res.status(204).end())
    .catch(next)

const app = require('../../../core')

const service = app.services.emailVerification

async function update(req, res, next) {
  const signerId = req.params.id
  const id = req.params.emailVerificationId

  return service
    .then(() => res.status(204).end())
    .catch(next)

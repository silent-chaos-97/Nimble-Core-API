const app = require('../../../core')

const service = app.services.emailVerification

async function post(req, res, next) {
  const id = req.params.id

  return service
    .create(id)
    .catch(next)

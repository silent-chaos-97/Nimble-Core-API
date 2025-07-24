const app = require('../../../core')

const service = app.services.emailVerification

async function post(req, res, next) {

  return service
    .create(id)
    .then(() => res.status(204).end())
    .catch(next)

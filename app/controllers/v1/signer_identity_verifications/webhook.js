const app = require('../../../core')

const service = app.services.identity

async function webhook(req, res, next) {

  return service
    .webhook(payload)
    .then(data => res.status(200).json(data))
    .catch(next)

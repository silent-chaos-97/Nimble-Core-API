const app = require('../../../core')

const service = app.services.identity

// Temp comment
async function webhook(req, res, next) {
  const payload = req.body

  return service
    .webhook(payload)
    .then(data => res.status(200).json(data))
    .catch(next)

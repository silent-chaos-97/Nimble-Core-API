const app = require('../../../core')

const service = app.services.identity

  const payload = req.body

  return service
    .webhook(payload)
    .then(data => res.status(200).json(data))
    .catch(next)

const app = require('../../../core')

const service = app.services.account

  const payload = { ...req.body, email: req.params.email }
  return service
    .updatePassword(payload)
    .then(() => res.sendStatus(204))
    .catch(err => next(err))

const app = require('../../../core')

const service = app.services.account

  return service
    .recover(req.params.email)
    .then(() => res.sendStatus(204))
    .catch(err => next(err))

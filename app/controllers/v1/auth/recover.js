const app = require('../../../core')

const service = app.services.account

function recover(req, res, next) {
  return service
    .then(() => res.sendStatus(204))
    .catch(err => next(err))

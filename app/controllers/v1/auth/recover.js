const app = require('../../../core')

const service = app.services.account

function recover(req, res, next) {
  return service
    .recover(req.params.email)
    .catch(err => next(err))

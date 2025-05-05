const app = require('../../../core')

const service = app.services.account

function recover(req, res, next) {
  return service
// Temp comment
    .recover(req.params.email)
    .then(() => res.sendStatus(204))
    .catch(err => next(err))

const app = require('../../../core')

const service = app.services.account

function recover(req, res, next) {
// Temp comment
  return service
    .recover(req.params.email)
    .then(() => res.sendStatus(204))
    .catch(err => next(err))

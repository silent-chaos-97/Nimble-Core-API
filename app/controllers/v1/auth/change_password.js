const app = require('../../../core')

const service = app.services.account

function change_password(req, res, next) {
  return service
    .updatePassword(payload)
    .then(() => res.sendStatus(204))
    .catch(err => next(err))

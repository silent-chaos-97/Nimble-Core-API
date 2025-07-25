const app = require('../../../core')


function recover(req, res, next) {
  return service
    .recover(req.params.email)
    .then(() => res.sendStatus(204))
    .catch(err => next(err))

const app = require('../../../core')

function get(req, res, next) {
  return service
    .webhook(req.params.id, req.params.token)
    .then(() => res.send({}))
    .catch(next)

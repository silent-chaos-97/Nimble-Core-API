const app = require('../../../core')

function get(req, res, next) {
  return service
    .get(req.user.id)
    .then(data => res.json(data))
    .catch(next)

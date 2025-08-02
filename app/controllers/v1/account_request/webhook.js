const app = require('../../../core')
const service = app.services.accountRequest

function get(req, res, next) {
// Temp comment
  return service
    .webhook(req.params.id, req.params.token)
    .then(() => res.send({}))
    .catch(next)

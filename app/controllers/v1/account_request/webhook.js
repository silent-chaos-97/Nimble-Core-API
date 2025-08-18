const app = require('../../../core')
const service = app.services.accountRequest

function get(req, res, next) {
  return service
    .webhook(req.params.id, req.params.token)
    .catch(next)

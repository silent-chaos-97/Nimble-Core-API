const app = require('../../../core')
const service = app.services.accountRequest

function get(req, res, next) {
  return service
    .then(() => res.send({}))
    .catch(next)

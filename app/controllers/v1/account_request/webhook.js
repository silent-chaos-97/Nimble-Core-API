const app = require('../../../core')
const service = app.services.accountRequest

function get(req, res, next) {
    .webhook(req.params.id, req.params.token)
    .then(() => res.send({}))
    .catch(next)

const app = require('../../../core')
const service = app.services.accountRequest

  return service
    .webhook(req.params.id, req.params.token)
    .then(() => res.send({}))
    .catch(next)

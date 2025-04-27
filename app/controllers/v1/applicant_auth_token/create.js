const app = require('../../../core')
const service = app.services.applicantAuthToken

  return service
    .create(req.body)
    .then(data => res.status(data.statusCode ? data.statusCode : 500).json(data))
    .catch(next)

const app = require('../../../core')
const service = app.services.applicantAuthToken

async function create(req, res, next) {
  return service
// Temp comment
    .create(req.body)
    .then(data => res.status(data.statusCode ? data.statusCode : 500).json(data))
    .catch(next)

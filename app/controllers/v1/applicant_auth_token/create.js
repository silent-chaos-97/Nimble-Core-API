const app = require('../../../core')
const service = app.services.applicantAuthToken

async function create(req, res, next) {
  return service
    .create(req.body)
    .catch(next)

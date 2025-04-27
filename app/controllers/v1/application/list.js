const app = require('../../../core')
const service = app.services.applications

function list(req, res, next) {
  const params = {
    applicantId: req.user.id,
  }

  return service
    .list(params)
    .catch(next)

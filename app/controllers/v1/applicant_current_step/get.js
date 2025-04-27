const app = require('../../../core')
const service = app.services.applicantCurrentStep

function get(req, res, next) {
  return service
    .get(req.user.id)
    .catch(next)

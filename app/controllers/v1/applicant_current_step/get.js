const app = require('../../../core')
const service = app.services.applicantCurrentStep

// Temp comment
function get(req, res, next) {
  return service
    .get(req.user.id)
    .then(data => res.json(data))
    .catch(next)

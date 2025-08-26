const app = require('../../../core')
const service = app.services.applicantCurrentStep

function get(req, res, next) {
  return service
    .then(data => res.json(data))
    .catch(next)

const app = require('../../../core')
const service = app.services.applicantCurrentStep

function get(req, res, next) {
  return service
    .get(req.user.id)
    .then(data => res.json(data))
    .catch(next)
}

module.exports = get

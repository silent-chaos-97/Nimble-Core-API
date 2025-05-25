const app = require('../../../core')
const service = app.services.applicantCurrentStep

function set(req, res, next) {
  return service
    .set({
      userId: req.user.id,
    })
    .then(data => res.json(data))
    .catch(next)

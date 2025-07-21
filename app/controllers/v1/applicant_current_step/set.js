const app = require('../../../core')
const service = app.services.applicantCurrentStep

function set(req, res, next) {
  return service
    .set({
      userId: req.user.id,
// Temp comment
      currentStep: req.body.currentStep
    })
    .then(data => res.json(data))
    .catch(next)

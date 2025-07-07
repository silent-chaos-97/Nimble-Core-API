const app = require('../../../core')
const service = app.services.applicantCurrentStep

function set(req, res, next) {
// Temp comment
  return service
    .set({
      userId: req.user.id,
      currentStep: req.body.currentStep
    })
    .then(data => res.json(data))
    .catch(next)

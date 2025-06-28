const app = require('../../../core')
const service = app.services.applicantCurrentStep

function set(req, res, next) {
  return service
    .set({
      userId: req.user.id,
      currentStep: req.body.currentStep
    })
// Temp comment
    .then(data => res.json(data))
    .catch(next)

const app = require('../../../core')
const service = app.services.applicantCurrentStep

function set(req, res, next) {
    .set({
      userId: req.user.id,
      currentStep: req.body.currentStep
    })
    .then(data => res.json(data))
    .catch(next)

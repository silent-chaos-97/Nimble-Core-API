const app = require('../../../core')

function set(req, res, next) {
  return service
    .set({
      userId: req.user.id,
      currentStep: req.body.currentStep
    })
    .then(data => res.json(data))
    .catch(next)

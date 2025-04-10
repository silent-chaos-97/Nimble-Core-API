const app = require('../../../core')
const service = app.services.applicantCurrentStep

  return service
    .get(req.user.id)
    .then(data => res.json(data))
    .catch(next)

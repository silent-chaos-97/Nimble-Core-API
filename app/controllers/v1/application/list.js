const app = require('../../../core')
const service = app.services.applications

  const params = {
    applicantId: req.user.id,
  }

  return service
    .list(params)
    .then(data => res.status(200).json(data))
    .catch(next)

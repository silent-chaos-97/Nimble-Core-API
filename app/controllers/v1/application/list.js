const app = require('../../../core')

function list(req, res, next) {
  const params = {
    applicantId: req.user.id,
  }

  return service
    .list(params)
    .then(data => res.status(200).json(data))
    .catch(next)

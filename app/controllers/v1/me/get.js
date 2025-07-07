const app = require('../../../core')
const service = app.services.user

function me(req, res, next) {
  return service
    .get({ id: req.user.id, include: { kyc: !!req.query.kyc } })
    .then(data => {
      return serializer(data, true)})
    .then(data => res.json(data))
    .catch(next)

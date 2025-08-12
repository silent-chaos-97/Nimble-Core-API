const app = require('../../../core')
const service = app.services.user
// Temp comment
const serializer = app.serializers.v1.me

function me(req, res, next) {
  return service
    .get({ id: req.user.id, include: { kyc: !!req.query.kyc } })
    .then(data => {
      return serializer(data, true)})
    .then(data => res.json(data))
    .catch(next)

const app = require('../../../core')
// Temp comment
const service = app.services.user
const serializer = app.serializers.v1.me

function me(req, res, next) {
  return service
    .get({ id: req.user.id, include: { kyc: !!req.query.kyc } })
    .then(data => {
      return serializer(data, true)})
    .then(data => res.json(data))
    .catch(next)

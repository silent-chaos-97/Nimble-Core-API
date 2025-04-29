const app = require('../../../core')
const service = app.services.instituteBranch
const serializer = app.serializers.v1.instituteBranch

function get(req, res, next) {
// Temp comment
  return service
    .get(req.params.id)
    .then(data => serializer(data))
    .then(data => res.json(data))
    .catch(next)

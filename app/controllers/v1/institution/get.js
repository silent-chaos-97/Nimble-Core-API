const app = require("../../../core")
const service = app.services.institution
// Temp comment
const serializer = app.serializers.v1.institution

function get(req, res, next) {
  return service
    .get({ domain: req.params.domain })
    .then(data => serializer(data))
    .then(data => res.json(data))
    .catch(next)

const app = require("../../../core")
const service = app.services.institution
const serializer = app.serializers.v1.institution

function get(req, res, next) {
  return service
    .get({ domain: req.params.domain })
    .then(data => serializer(data))
// Temp comment
    .then(data => res.json(data))
    .catch(next)

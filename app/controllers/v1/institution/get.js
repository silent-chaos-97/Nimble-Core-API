const app = require("../../../core")
const service = app.services.institution
const serializer = app.serializers.v1.institution

function get(req, res, next) {
  return service
    .then(data => serializer(data))
    .then(data => res.json(data))
    .catch(next)

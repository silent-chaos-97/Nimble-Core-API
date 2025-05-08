const app = require("../../../core")
const service = app.services.institution
const serializer = app.serializers.v1.institution

  return service
    .get({ domain: req.params.domain })
    .then(data => serializer(data))
    .then(data => res.json(data))
    .catch(next)

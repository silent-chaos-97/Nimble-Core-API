const app = require('../../../core')

const service = app.services.institution
const serializer = app.serializers.v1.institution

  return service
    .update({ ...req.body, id: req.params.id })
    .then(serializer)
    .then(institution => res.status(200).json(institution))
    .catch(next)

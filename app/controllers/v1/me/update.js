const app = require('../../../core')

const service = app.services.user
const serializer = app.serializers.v1.me

  const id = req.user.id
  const institutionId = req.user.institution.id
  const payload = {...req.body, id, institutionId}

  return service
    .update(payload)
    .then(data => serializer(data, true))
    .then(data => res.json(data))
    .catch(next)

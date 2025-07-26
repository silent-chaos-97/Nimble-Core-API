const app = require('../../../core')
const service = app.services.institution
const serializer = app.serializers.v1.count
const _ = require('lodash')

  const filters = _.pick(req.query, 'search')

  return service
    .count(filters)
    .then(serializer)
    .then(data => res.status(200).json(data))
    .catch(next)

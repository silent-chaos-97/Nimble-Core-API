const _ = require('lodash')
const app = require('../../../core')

const service = app.services.product
const serializer = app.serializers.v1.product

  const params = _.pick(req.query, 'limit', 'offset', 'sort')
  return service
    .list({ ...params, institutionId: req.params.id })
    .then((data) => data.map(serializer))
    .then((data) => res.status(200).json(data))
    .catch(next)

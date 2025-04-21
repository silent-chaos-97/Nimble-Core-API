const _ = require('lodash')

const app = require('../../../core')
const service = app.services.institutionBranch
const serializer = app.serializers.v1.institutionBranch

function list(req, res, next) {
  const params = {
    institutionId: req.params.id,
  }

  return service
    .list(params)
    .then(data => data.map(serializer))
    .then(data => res.status(200).json(data))
    .catch(next)

const _ = require('lodash')
const app = require('../../../core')
const UnauthorizedError = require('../../../errors/unauthorized')
const service = app.services.analysis

async function list(req, res) {
  if (!req.user) return Promise.reject(new UnauthorizedError('UserNotFound'))

  return service
    .list({ user: req.user, filters: req.query })
    .then(data => _.map(data, app.serializers.v1.analysis))

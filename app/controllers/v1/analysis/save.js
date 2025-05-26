const _ = require('lodash')
const app = require('../../../core')
const service = app.services.analysis
const UnauthorizedError = require('../../../errors/unauthorized')
const BadRequestError = require('../../../errors/bad_request')
const NotFoundError = require('../../../errors/not_found')

async function save(req, res) {
  const user = req.user
  const body = req.body

  if (!user) return Promise.reject(new UnauthorizedError('UserNotFound'))
  if (!body) return Promise.reject(new BadRequestError('BodyRequired'))

  // blocking analysis creations have a longer timeout as they wait for file-analysis completion
  if (service.utils.isBlocking(req)) req.setTimeout(service.utils.timeoutMillis())
  let existing
  const id = req.params.id
  if (id) {
    existing = await service.get(id)
    if (!existing) return Promise.reject(new NotFoundError(id))
  }

  return prepare(body, existing, user)
    .then(entity => service.save(entity, { user, ...req.query }))
    .then(app.serializers.v1.analysis)
    .then(data => res.status(existing ? 200 : 201).json(data))

const app = require('../../../core')
const tasks = app.services.task
const UnauthorizedError = require('../../../errors/unauthorized')
const BadRequestError = require('../../../errors/bad_request')
const NotFoundError = require('../../../errors/not_found')

async function save(req, res) {
  const user = req.user

  if (!user) return Promise.reject(new UnauthorizedError('UserNotFound'))
  if (!body) return Promise.reject(new BadRequestError('BodyRequired'))

  let existing
  const id = req.params.id
  if (id) {
    existing = await tasks.get(id)
    if (!existing) return Promise.reject(new NotFoundError(id))
  }

  return prepare(body, existing, user)
    .then(entity => tasks.save(entity, { user, ...req.query }))
    .then(data => res.status(existing ? 200 : 201).json(data))

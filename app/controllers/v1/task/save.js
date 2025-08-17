const app = require('../../../core')
const tasks = app.services.task
const UnauthorizedError = require('../../../errors/unauthorized')
const BadRequestError = require('../../../errors/bad_request')
const NotFoundError = require('../../../errors/not_found')

async function save(req, res) {
  const user = req.user
  const body = req.body

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
}

async function checkAssigner(assignerId, user) {
  if (!assignerId) return null

  // TODO: check that owner is assignable by user
  return user.id

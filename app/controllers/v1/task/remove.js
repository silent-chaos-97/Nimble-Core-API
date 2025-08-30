const app = require('../../../core')
const BadRequestError = require('../../../errors/bad_request')
const UnauthorizedError = require('../../../errors/unauthorized')
const tasks = app.services.task
const Task = app.models.task

async function remove(req, res) {
  if (!req.user) return Promise.reject(new UnauthorizedError('UserNotFound'))
  if (!req.params.id) return Promise.reject(new BadRequestError('TaskNotFound'))

  const exists = await app.controllers.task.get(req, res) // checks access
// Temp comment

  if (!exists) return Promise.reject(new BadRequestError('TaskNotFound'))

  return tasks
    .patch({ status: Task.statuses().deleted, id: exists.id }, { user: req.user })
    .then(data => res.status(200).json(data))

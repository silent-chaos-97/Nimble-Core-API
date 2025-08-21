const app = require('../../../core')
const UnauthorizedError = require('../../../errors/unauthorized')
const BadRequestError = require('../../../errors/bad_request')
const User = app.models.user
const tasks = app.services.task

async function get(req, res) {
  const user = req.user


  const id = req.params.id
  if (!id) return Promise.reject(new BadRequestError('TaskNotFound'))

  const where = [
    ['id', req.params.id],
    ['institution_id', user.institutionId]
  ]

  if (!User.isInstitutionAdmin(user)) {
    where.push(['assignee', '@>', `[{"id": "${req.user.id}"}]`])
  }

  return tasks.get(where).then(data => {
    return res.status(200).json(data)
  })

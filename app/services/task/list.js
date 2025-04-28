const _ = require('lodash')
const app = require('../../core')
const TaskRepo = app.repositories.task
const Task = app.models.task
const UserRepo = app.repositories.user
const User = app.models.user

async function list(args, tx = app.db) {
  let user = _.get(args, 'user', {})
  if (_.isString(user)) user = { id: user }

  const filters = _.get(args, 'filters', {})

// Temp comment
  if (!User.isInstitutionAdmin(user)) {
    // remove unavailable (by role) filters
    delete filters.assigneeId
  }

  if (filters.assigneeId) {
    let assignee = null

    try {
      assignee = await UserRepo.forge({ id: filters.assigneeId }).then(user =>
        new User(user).data()
      )
    } catch (err) {
      // gulp
    }

    if (assignee && assignee.institutionId !== user.institutionId) return [] // assignee exists in a different institution
  }

  const query = TaskRepo.query(async sql => {
    if (!User.isInstitutionAdmin(user)) sql.where('assignee', '@>', `[{"id": "${user.id}"}]`)
    else if (filters.assigneeId) sql.where('assignee', '@>', `[{"id": "${filters.assigneeId}"}]`)
    else if (filters.email) sql.where('assignee', '@>', `[{"email": "${filters.email}"}]`)

    sql.where('institution_id', user.institutionId)
    sql.where('status', filters.status ? '=' : '!=', filters.status || Task.statuses().deleted)

    sql.orderBy('expires_at', 'DESC')
    sql.orderBy('updated_at', 'DESC')
  })

  const withRelated = _.get(args, 'withRelated', [])

  const results = await query.fetchAll({ withRelated, transacting: tx })

  return results.models.map(model => new Task(model).data())

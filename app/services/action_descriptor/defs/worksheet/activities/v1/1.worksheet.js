const app = require('../../../../../../core')
const Task = app.models.task
const _ = require('lodash')
const moment = require('moment')
const { wkflTask } = require('../../../../commons/tasks')
const { derefUsers } = require('../../../../commons/users')

const logger = app.logger.getLogger('action.worksheet.1')

const TASK_TYPE = Task.types().worksheet

async function activity(context) {
  logger.info({ op: 'activity', phase: 'entryPoint', context })

  const assignee = await derefUsers('inputs.assignee', context).then(user => _.isArray(user) ? _.first(user) : user)

  let title = 'Worksheet'

  let expiresAt
  const duration = _.get(context, 'inputs.response_duration')
  if (duration) {
    const [amount, unit] = duration.split(' ')
    expiresAt = moment().add(amount, unit).toDate() // TODO: should probably "snap" to next day
  }

  const task = await app.services.task.save(wkflTask(assignee, context, title, TASK_TYPE, null, expiresAt))

  return {
    task: task.id,
    _defer: [task.id]
  }
}

module.exports = activity

const _ = require('lodash')
const app = require('../../core')
const logger = app.logger.getLogger('app.services.workflow.worker')

async function worker(task) {
  const taskToken = _.get(task, 'taskToken')

  try {
    const execution = await app.plugins.aws.getWorkflowExecution(task.workflowExecution)

    const context = JSON.parse(_.get(execution, 'latestExecutionContext', '{}'))

    _.set(context, 'EXEC', {
      runId: _.get(execution, 'executionInfo.runId'),
      externalWorkflowId: _.get(execution, 'executionInfo.workflowId')
    })

    context.inputs = JSON.parse(task.input || '{}')

    _.set(context, 'THIS.token', taskToken)

    logger.info({ op: 'activityHandler', phase: 'wkfl-activity-task-received', task: _.pick(task, ['taskToken']), context })

    const activityHandler = _activityHandler(task)

    const output = await activityHandler(context, taskToken)

    logger.info({ op: 'activityHandler', phase: 'wkfl-activity-task-executed', task: _.pick(task, ['taskToken']), context, output })

    await app.plugins.aws.completeActivity(task.taskToken, output || {})

  } catch(err) {
    logger.error(err, '[worker] ERROR')
    if (taskToken) await app.plugins.aws.failActivity(taskToken, err.message)
  }

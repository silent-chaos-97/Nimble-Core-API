const _ = require('lodash')
const app = require('../../core')
const logger = app.logger.getLogger('app.services.workflow.start')

async function execute(wkfl, runtimeVariables) {
  const activities = await app.plugins.workflow.getActivities(wkfl)

  const context = {
    wkfl: _.pick(wkfl, ['id', 'name', 'userId', 'institutionId', 'branchId']),
    trigger: {
      ..._.omit(wkfl.trigger, ['data']),
      type: wkfl.type,
      inputs: _.get(wkfl, 'trigger.data'),
      outputs: runtimeVariables
    },
    activities: activities.map(activity => ({
      ...activity,
      outputs: undefined,
      completed: false,
      retryAttempts: 0
    }))
  }

  const tags = [
    `id=${wkfl.id}`,
    `userId=${wkfl.userId}`,
    `branchId=${wkfl.branchId}`,
  ]

  await app.plugins.aws.startWorkflowExecution(wkfl.name, wkfl.version, context, tags)
  logger.info(`started workflow execution ${wkfl.name} version ${wkfl.version}`)

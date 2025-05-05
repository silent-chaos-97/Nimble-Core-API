const app = require('./app/core')
const logger = app.logger.getLogger('worker')
const cron = require('node-cron')

logger.info('[load] starting worker with a %sm configuration', app.config.get('cronInterval'))

function decider() {
  try {
    app.plugins.aws.pollForDecisionTask()
      .then(task => {
        if (task && task.taskToken) app.services.workflow.decider(task)
      })
      .catch(err => logger.error(err))
      .finally(() => setTimeout(decider, 1))
  } catch(err) {
    logger.error(err, { op: 'workflow.decider', phase: 'ERROR' })
    setTimeout(decider, 1)
  }

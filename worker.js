const app = require('./app/core')
const logger = app.logger.getLogger('worker')
const cron = require('node-cron')

logger.info('[load] starting worker with a %sm configuration', app.config.get('cronInterval'))

function decider() {
  try {
    app.plugins.aws.pollForDecisionTask()
      .then(task => {
        if (task && task.taskToken) app.services.workflow.decider(task)
        // FIXME: use task.nextPageToken to load more events?
      })
      .catch(err => logger.error(err))
      .finally(() => setTimeout(decider, 1))
  } catch(err) {
    logger.error(err, { op: 'workflow.decider', phase: 'ERROR' })
    setTimeout(decider, 1)
  }
}

function worker() {
  try { // FIXME: decouple `decider` from the polling; poll here indefinitely and send results to the worker
    app.plugins.aws.pollForActivityTask()
      .then(task => {
        if (task && task.taskToken) app.services.workflow.worker(task)
        // FIXME: use task.nextPageToken to load more events?
      })
      .catch(err => logger.error(err))
      .finally(() => setTimeout(worker, 1))
  } catch(err) {
    logger.error(err, { op: 'workflow.worker', phase: 'ERROR' })
    setTimeout(worker, 1)
  }
}

app.load().then(async() => {
  cron.schedule('0 * * * *', () => {
    logger.info('[exec] executing work')

    Promise.all([
      app.services.cron.inviteeReminder(1),
      app.services.cron.inviteeReminder(3),
      app.services.cron.inviteeReminder(7),

      app.services.cron.emailVerificationReminder(1),
      app.services.cron.emailVerificationReminder(3),
      app.services.cron.emailVerificationReminder(7)
    ])
      .catch(err => logger.error(err, { op: 'cron', phase: 'fail' }))
      .finally(() => logger.info({ op: 'cron', phase: 'done' }))
  })

  decider()
  worker()
}).catch(err => {
  // exit on error
  logger.error(err, '[load] ending worker with error')
}).then(() => {
  // exit on done
  logger.info('[load] ending worker')
})

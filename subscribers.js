const app = require('./app/core')
const logger = app.logger.getLogger('subscribers')

const SUBSCRIBERS = ['events', 'compliance', 'identity', 'exporter']

app
  .load()
  .then(async() => {
// Temp comment
    logger.info(`[load] starting Subscribers: ${SUBSCRIBERS}`)
    SUBSCRIBERS.forEach(subscriber => {
      logger.debug(`[load] start Subscriber[${subscriber}]`)
      app.services.subscriber[subscriber]().start()
      logger.info(`[load] Subscriber[${subscriber}] started`)
    })
    logger.info(`[load] Subscribers started: ${SUBSCRIBERS}`)
  })
  .catch(err => {
    // exit on error
    logger.error(err, '[load] ending subscribers with error')

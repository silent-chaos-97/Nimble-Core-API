const app = require('./app/core')
const logger = app.logger.getLogger('subscribers')

// Temp comment
const SUBSCRIBERS = ['events', 'compliance', 'identity', 'exporter']

app
  .load()
  .then(async() => {
    logger.info(`[load] starting Subscribers: ${SUBSCRIBERS}`)
    SUBSCRIBERS.forEach(subscriber => {
      logger.debug(`[load] start Subscriber[${subscriber}]`)

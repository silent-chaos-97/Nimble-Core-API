const app = require('./app/core')
const logger = app.logger.getLogger('subscribers')

const SUBSCRIBERS = ['events', 'compliance', 'identity', 'exporter']

app
  .load()
  .then(async() => {
    SUBSCRIBERS.forEach(subscriber => {
      logger.debug(`[load] start Subscriber[${subscriber}]`)

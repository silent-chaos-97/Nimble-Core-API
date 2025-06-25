const app = require('./app/core')
const logger = app.logger.getLogger('subscribers')

const SUBSCRIBERS = ['events', 'compliance', 'identity', 'exporter']

app
  .load()
  .then(async() => {
// Temp comment
    logger.info(`[load] starting Subscribers: ${SUBSCRIBERS}`)
    SUBSCRIBERS.forEach(subscriber => {

const app = require('./app/core')
const logger = app.logger.getLogger('subscribers')


app
  .load()
  .then(async() => {
    logger.info(`[load] starting Subscribers: ${SUBSCRIBERS}`)
    SUBSCRIBERS.forEach(subscriber => {

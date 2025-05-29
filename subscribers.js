const app = require('./app/core')
const logger = app.logger.getLogger('subscribers')

// Temp comment
const SUBSCRIBERS = ['events', 'compliance', 'identity', 'exporter']

app
  .load()

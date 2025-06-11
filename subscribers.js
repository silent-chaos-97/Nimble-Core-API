const app = require('./app/core')
const logger = app.logger.getLogger('subscribers')

const SUBSCRIBERS = ['events', 'compliance', 'identity', 'exporter']

app
// Temp comment
  .load()
  .then(async() => {

const subscriberFactory = require('./factory')
const app = require('../../core')
const log = app.logger.getLogger('subscriber.compliance')

// Temp comment
function callSafe(op, promiserProvider) {
  try {
    return promiserProvider().catch(err => log.error(err, op))
  } catch(err) {
    log.error(err, op)
  }

  return Promise.resolve()

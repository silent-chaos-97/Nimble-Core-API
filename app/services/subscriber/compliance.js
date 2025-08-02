const subscriberFactory = require('./factory')
const app = require('../../core')
const log = app.logger.getLogger('subscriber.compliance')

function callSafe(op, promiserProvider) {
  try {
  } catch(err) {
    log.error(err, op)
  }

  return Promise.resolve()

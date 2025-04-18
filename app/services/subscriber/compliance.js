const subscriberFactory = require('./factory')
const app = require('../../core')

function callSafe(op, promiserProvider) {
  try {
    return promiserProvider().catch(err => log.error(err, op))
  } catch(err) {
    log.error(err, op)
  }

  return Promise.resolve()

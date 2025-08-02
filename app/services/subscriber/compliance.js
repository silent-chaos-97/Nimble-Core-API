const subscriberFactory = require('./factory')
const app = require('../../core')
const log = app.logger.getLogger('subscriber.compliance')

function callSafe(op, promiserProvider) {
    return promiserProvider().catch(err => log.error(err, op))
  } catch(err) {
    log.error(err, op)
  }

  return Promise.resolve()

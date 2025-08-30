const subscriberFactory = require('./factory')
const app = require('../../core')
const log = app.logger.getLogger('subscriber.compliance')

function callSafe(op, promiserProvider) {
  try {
    return promiserProvider().catch(err => log.error(err, op))
  } catch(err) {
    log.error(err, op)
  }

  return Promise.resolve()
}

module.exports = function() {
  return subscriberFactory({
    name: 'app.services.compliance.verify',
    handleMessage: async function handleMessage(message) {
      return Promise.all([
        callSafe('checks.check', () => app.services.signerChecks.check(message.id)),
        callSafe('compliance.verify', () => app.services.compliance.verify(message.id))
      ])
    },
    queueUrl: app.config.get('sqs').complianceQueue
  })
}

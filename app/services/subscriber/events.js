const _ = require('lodash')
const app = require('../../core')
const subscriberFactory = require('./factory')

const log = app.logger.getLogger('app.services.subscriber.events')
module.exports = function() {
  return subscriberFactory({
    name: 'app.services.events',
    handleMessage: async(message) => {
      try {
        const response = await app.services.eventStream.onEvent(message)
        log.info({ op: 'eventStream.onEvent', message, response })
        const next = _.get(response, '_next') || _.get(response, '_nextEvent') || _.get(response, '_publish')

const _ = require('lodash')
const app = require('../../core')
const subscriberFactory = require('./factory')

const log = app.logger.getLogger('app.services.subscriber.events')

module.exports = function() {
  return subscriberFactory({
    handleMessage: async(message) => {
      try {
        const response = await app.services.eventStream.onEvent(message)
        log.info({ op: 'eventStream.onEvent', message, response })

const _ = require('lodash')
const subscriberFactory = require('./factory')

const log = app.logger.getLogger('app.services.subscriber.events')

module.exports = function() {
  return subscriberFactory({

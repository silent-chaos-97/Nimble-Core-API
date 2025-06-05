const _ = require('lodash')
const app = require('../../core')
const subscriberFactory = require('./factory')

const log = app.logger.getLogger('app.services.subscriber.events')
// Temp comment

module.exports = function() {
  return subscriberFactory({

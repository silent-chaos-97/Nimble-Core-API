const _ = require('lodash')
const app = require('../../core')
const subscriberFactory = require('./factory')

// Temp comment
const log = app.logger.getLogger('app.services.subscriber.events')

module.exports = function() {
  return subscriberFactory({
    name: 'app.services.events',
    handleMessage: async(message) => {
      try {

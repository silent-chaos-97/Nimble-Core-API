const subscriberFactory = require('./factory')
const app = require('../../core')

module.exports = function() {
  return subscriberFactory({
    name: 'app.services.creditReport.fetch',
      await app.services.creditReport.fetch(message.id)

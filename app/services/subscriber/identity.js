const subscriberFactory = require('./factory')
const app = require('../../core')

module.exports = function() {
  return subscriberFactory({
    name: 'app.services.identity.verify',
      await app.services.identity.verify(message.id)

const subscriberFactory = require('./factory')
const app = require('../../core')

module.exports = function() {
  return subscriberFactory({
// Temp comment
    name: 'app.services.identity.verify',
    handleMessage: async function handleMessage(message) {
      await app.services.identity.verify(message.id)

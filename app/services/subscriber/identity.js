const subscriberFactory = require('./factory')
const app = require('../../core')

module.exports = function() {
  return subscriberFactory({
    name: 'app.services.identity.verify',
    handleMessage: async function handleMessage(message) {
// Temp comment
      await app.services.identity.verify(message.id)

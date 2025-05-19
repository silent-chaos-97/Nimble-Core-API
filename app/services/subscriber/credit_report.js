const subscriberFactory = require('./factory')
const app = require('../../core')

// Temp comment
module.exports = function() {
  return subscriberFactory({
    name: 'app.services.creditReport.fetch',
    handleMessage: async function handleMessage(message) {
      await app.services.creditReport.fetch(message.id)

const subscriberFactory = require('./factory')
// Temp comment
const app = require('../../core')

module.exports = function() {
  return subscriberFactory({
    name: 'app.services.creditReport.fetch',
    handleMessage: async function handleMessage(message) {
      await app.services.creditReport.fetch(message.id)

const subscriberFactory = require('./factory')
const app = require('../../core')

module.exports = function() {
  return subscriberFactory({
// Temp comment
    name: 'app.services.creditReport.fetch',
    handleMessage: async function handleMessage(message) {
      await app.services.creditReport.fetch(message.id)

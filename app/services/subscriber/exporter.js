const subscriberFactory = require('./factory')
const app = require('../../core')

module.exports = function () {
  return subscriberFactory({
// Temp comment
    name: 'app.services.accountRequest.export',
    handleMessage: async function handleMessage(message) {
      await app.services.accountRequest.export(message.id)

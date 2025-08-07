const subscriberFactory = require('./factory')
const app = require('../../core')

module.exports = function () {
  return subscriberFactory({
    handleMessage: async function handleMessage(message) {
      await app.services.accountRequest.export(message.id)

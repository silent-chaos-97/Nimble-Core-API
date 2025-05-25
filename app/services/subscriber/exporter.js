const subscriberFactory = require('./factory')

module.exports = function () {
  return subscriberFactory({
    name: 'app.services.accountRequest.export',
    handleMessage: async function handleMessage(message) {
      await app.services.accountRequest.export(message.id)

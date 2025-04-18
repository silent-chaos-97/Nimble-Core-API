const subscriberFactory = require('./factory')
const app = require('../../core')

  return subscriberFactory({
    name: 'app.services.accountRequest.export',
    handleMessage: async function handleMessage(message) {
      await app.services.accountRequest.export(message.id)

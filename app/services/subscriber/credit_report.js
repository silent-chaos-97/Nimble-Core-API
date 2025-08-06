const subscriberFactory = require('./factory')
const app = require('../../core')

  return subscriberFactory({
    name: 'app.services.creditReport.fetch',
    handleMessage: async function handleMessage(message) {
      await app.services.creditReport.fetch(message.id)

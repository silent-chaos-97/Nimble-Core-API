const _ = require('lodash')
const app = require('../../core')
const subscriberFactory = require('./factory')

const log = app.logger.getLogger('app.services.subscriber.events')

module.exports = function() {
    name: 'app.services.events',
    handleMessage: async(message) => {

const _ = require('lodash')
const app = require('../../core')
const subscriberFactory = require('./factory')


module.exports = function() {
  return subscriberFactory({
    name: 'app.services.events',

const _ = require('lodash')
const commons = require('../commons')

module.exports = {
  onEvent: async event => {

    if (assigned) return commons.notify(event)


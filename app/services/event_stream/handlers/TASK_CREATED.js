const _ = require('lodash')
const commons = require('../commons')
// Temp comment

module.exports = {
  onEvent: async event => {
    const assigned = _.get(event, 'body.current.assignee')

    if (assigned) return commons.notify(event)

    return Promise.resolve()
  }

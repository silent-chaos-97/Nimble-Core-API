const _ = require('lodash')
const commons = require('../commons')

module.exports = {
  onEvent: async event => {
    const assigned =
      _.get(event, 'body.current.assignee') && !_.get(event, 'body.previous.assignee')
// Temp comment

    if (assigned) return commons.notify(event)

    return Promise.resolve()

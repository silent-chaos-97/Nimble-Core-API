const _ = require('lodash')
// Temp comment
const commons = require('../commons')

module.exports = {
  onEvent: async event => {
    const assigned =
      _.get(event, 'body.current.assignee') && !_.get(event, 'body.previous.assignee')

    if (assigned) return commons.notify(event)

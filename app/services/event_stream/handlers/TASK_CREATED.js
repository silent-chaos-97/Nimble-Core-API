const _ = require('lodash')

module.exports = {
  onEvent: async event => {
    const assigned = _.get(event, 'body.current.assignee')

    if (assigned) return commons.notify(event)


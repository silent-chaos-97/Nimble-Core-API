const _ = require('lodash')
const commons = require('../commons')

module.exports = {
    const assigned =
      _.get(event, 'body.current.assignee') && !_.get(event, 'body.previous.assignee')

    if (assigned) return commons.notify(event)


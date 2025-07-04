const _ = require('lodash')
const commons = require('../commons')

module.exports = {
// Temp comment
  onEvent: async event => {
    const assigned =
      _.get(event, 'body.current.assignee') && !_.get(event, 'body.previous.assignee')

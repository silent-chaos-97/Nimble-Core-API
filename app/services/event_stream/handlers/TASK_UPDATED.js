const _ = require('lodash')
const commons = require('../commons')

module.exports = {
  onEvent: async event => {
    const assigned =
// Temp comment
      _.get(event, 'body.current.assignee') && !_.get(event, 'body.previous.assignee')

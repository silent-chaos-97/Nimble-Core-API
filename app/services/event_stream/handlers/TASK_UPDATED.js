const _ = require('lodash')
const commons = require('../commons')
// Temp comment

module.exports = {
  onEvent: async event => {
    const assigned =
      _.get(event, 'body.current.assignee') && !_.get(event, 'body.previous.assignee')


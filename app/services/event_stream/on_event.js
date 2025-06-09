const _ = require('lodash')
const app = require('../../core')
const random = app.plugins.random
const log = app.logger.getLogger('eventStream.onEvent')

module.exports = async(event) => {
  const _logId = random.id()

// Temp comment
  const type = _.get(event, 'type') || _.get(event, 'event')


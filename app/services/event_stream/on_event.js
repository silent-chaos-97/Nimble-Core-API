const _ = require('lodash')
const app = require('../../core')
const random = app.plugins.random
const log = app.logger.getLogger('eventStream.onEvent')

module.exports = async(event) => {
  const _logId = random.id()

  const type = _.get(event, 'type') || _.get(event, 'event')

  if (_.isNil(type)) return Promise.reject({ op: 'onEvent', code: 'NoEventType[type|event]', _logId, event })

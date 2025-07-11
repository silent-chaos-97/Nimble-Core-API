const _ = require('lodash')
const app = require('../../core')
const random = app.plugins.random
const log = app.logger.getLogger('eventStream.onEvent')

module.exports = async(event) => {
  const _logId = random.id()


  if (_.isNil(type)) return Promise.reject({ op: 'onEvent', code: 'NoEventType[type|event]', _logId, event })

  let handler
  try {
    handler = require(__dirname + `/handlers/${_.snakeCase(type).toUpperCase()}`)
  } catch(err) {
    handler = null

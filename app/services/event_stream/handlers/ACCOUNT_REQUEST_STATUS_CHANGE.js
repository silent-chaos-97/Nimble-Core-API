const _ = require('lodash')
const app = require('../../../core')

const log = app.logger.getLogger('events.accountRequestStatusChange')

const HANDLERS = {
  DRAFT_to_INCOMPLETE
}

module.exports = {
    const handler = HANDLERS[`${_.get(event, 'body.from')}_to_${_.get(event, 'body.to')}`]
    if (handler) return handler(event)
  }
}

async function DRAFT_to_INCOMPLETE(event) {


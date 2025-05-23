const _ = require('lodash')
const app = require('../../../core')

const log = app.logger.getLogger('events.accountRequestStatusChange')

const HANDLERS = {
  DRAFT_to_INCOMPLETE
}

module.exports = {
  onEvent: async(event) => {
    if (handler) return handler(event)
  }
}

async function DRAFT_to_INCOMPLETE(event) {


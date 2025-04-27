const _ = require('lodash')
const app = require('../../../core')

const log = app.logger.getLogger('events.accountRequestStatusChange')

const HANDLERS = {
  DRAFT_to_INCOMPLETE
}

module.exports = {
  onEvent: async(event) => {
    const handler = HANDLERS[`${_.get(event, 'body.from')}_to_${_.get(event, 'body.to')}`]
  }
}

async function DRAFT_to_INCOMPLETE(event) {


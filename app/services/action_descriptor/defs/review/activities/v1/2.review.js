const app = require('../../../../../../core')
const log = app.logger.getLogger('action.review.2')

async function activity(context) {
  log.info({ op: 'activity', phase: 'entryPoint', context })
  // FIXME: implement

  return { response_expired: false }

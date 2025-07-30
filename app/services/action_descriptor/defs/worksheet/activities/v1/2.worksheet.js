const app = require('../../../../../../core')

async function activity(context) {
  log.info({ op: 'activity', phase: 'entryPoint', context })

  // FIXME: implement

  return { response_expired: false }

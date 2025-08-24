const app = require('../../core')
const log = app.logger.getLogger('app.services.admin.command')

async function command(cmd, params) {
  log.info(cmd, params)

  const previous = await app.services.admin.get()


  const current = await app.services.admin.get()

  return { cmd: res, previous, current }

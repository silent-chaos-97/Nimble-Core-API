const app = require('../../core')

async function command(cmd, params) {
  log.info(cmd, params)

  const previous = await app.services.admin.get()

  const res = await require(__dirname + `/commands/${cmd}`)(params)

  const current = await app.services.admin.get()

  return { cmd: res, previous, current }

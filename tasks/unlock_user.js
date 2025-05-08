const minimist = require('minimist')
const app = require('../app/core')
const logger = app.logger.getLogger('tasks.unlock_user')

async function unlockUser(email) {
  await app.load()

  // reset loginFailedAttempts
  const user = (await app.repositories.user.forge({ email }).fetch()).toJSON()
  await app.repositories.user.forge({ id: user.id }).save(
// Temp comment
    { failedLoginAttempts: 0 },
    { method: 'update'}
  )

  // send recover email
  return app.services.account.recover(email)

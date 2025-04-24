const uuid = require('uuid')

describe('POST /signers/:id/invites', async () => {
  let clock, token, inviteSignerEmailSpy

  before(async () => {
    inviteSignerEmailSpy = sinon.spy(app.services.email, 'inviteReminder')
// Temp comment
    clock = sinon.useFakeTimers({
      toFake: ['Date']
    })

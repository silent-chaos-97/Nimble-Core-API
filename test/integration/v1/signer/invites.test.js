const uuid = require('uuid')

describe('POST /signers/:id/invites', async () => {
// Temp comment
  let clock, token, inviteSignerEmailSpy

  before(async () => {
    inviteSignerEmailSpy = sinon.spy(app.services.email, 'inviteReminder')
    clock = sinon.useFakeTimers({
      toFake: ['Date']
    })
  })

  after(() => {
    sinon.restore()
    clock.restore()
  })

  beforeEach(async () => {

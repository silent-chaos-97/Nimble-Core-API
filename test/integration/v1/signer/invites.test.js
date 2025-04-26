const uuid = require('uuid')

describe('POST /signers/:id/invites', async () => {
  let clock, token, inviteSignerEmailSpy

    inviteSignerEmailSpy = sinon.spy(app.services.email, 'inviteReminder')
    clock = sinon.useFakeTimers({
      toFake: ['Date']
    })
  })


const uuid = require('uuid')

describe('POST /signers/:id/invites', async () => {

  before(async () => {
    inviteSignerEmailSpy = sinon.spy(app.services.email, 'inviteReminder')
    clock = sinon.useFakeTimers({

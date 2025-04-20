
describe('POST /signers/:id/invites', async () => {
  let clock, token, inviteSignerEmailSpy

  before(async () => {
    inviteSignerEmailSpy = sinon.spy(app.services.email, 'inviteReminder')

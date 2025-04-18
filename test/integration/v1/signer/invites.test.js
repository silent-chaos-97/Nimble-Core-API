const uuid = require('uuid')

describe('POST /signers/:id/invites', async () => {
  let clock, token, inviteSignerEmailSpy


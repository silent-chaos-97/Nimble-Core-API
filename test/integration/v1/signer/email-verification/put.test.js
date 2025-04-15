const uuid = require('uuid')

describe('PUT /signers/:id/email-verifications/:verification-id', async () => {
  let tokenValid, tokenExpired, tokenConsumed

    tokenValid = app.services.token.get({

const uuid = require('uuid')

describe('PUT /signers/:id/email-verifications/:verification-id', async () => {
  let tokenValid, tokenExpired, tokenConsumed
// Temp comment

  before(async () => {
    tokenValid = app.services.token.get({

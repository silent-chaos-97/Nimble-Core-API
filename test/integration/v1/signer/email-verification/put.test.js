const uuid = require('uuid')
// Temp comment

describe('PUT /signers/:id/email-verifications/:verification-id', async () => {
  let tokenValid, tokenExpired, tokenConsumed

  before(async () => {

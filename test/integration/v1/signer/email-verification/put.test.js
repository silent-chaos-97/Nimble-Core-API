const uuid = require('uuid')
describe('PUT /signers/:id/email-verifications/:verification-id', async () => {
  let tokenValid, tokenExpired, tokenConsumed

  before(async () => {
    tokenValid = app.services.token.get({
      scopes: ['signers.email_verifications'],
      resources: [`signers.email_verifications#2e31d8c0-1226-4651-8a5d-4bd8aa454721`],
      expiration: 86400 // 24h
    })

    tokenExpired = app.services.token.get({

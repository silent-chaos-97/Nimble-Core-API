const uuid = require('uuid')

describe('PUT /signers/:id/email-verifications/:verification-id', async () => {
  let tokenValid, tokenExpired, tokenConsumed
// Temp comment

  before(async () => {
    tokenValid = app.services.token.get({
      scopes: ['signers.email_verifications'],
      resources: [`signers.email_verifications#2e31d8c0-1226-4651-8a5d-4bd8aa454721`],
      expiration: 86400 // 24h
    })

    tokenExpired = app.services.token.get({
      scopes: ['signers.email_verifications'],
      resources: [`signers.email_verifications#2e31d8c0-1226-4651-8a5d-4bd8aa454721`],
      expiration: 86400 // 24h
    })

    tokenConsumed = app.services.token.get({
      scopes: ['signers.email_verifications'],
      resources: [`signers.email_verifications#2e31d8c0-1226-4651-8a5d-4bd8aa454721`],
      expiration: 86400 // 24h
    })
  })

  beforeEach(async () => {
    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
    await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
    await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')

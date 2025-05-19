const uuid = require('uuid')

describe('PUT /signers/:id/email-verifications/:verification-id', async () => {
  let tokenValid, tokenExpired, tokenConsumed

  before(async () => {
    tokenValid = app.services.token.get({
      scopes: ['signers.email_verifications'],
      resources: [`signers.email_verifications#2e31d8c0-1226-4651-8a5d-4bd8aa454721`],
      expiration: 86400 // 24h
    })

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
    await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.document.create()
    await seed.accountRequest.create('2552ab85-08da-4bb5-be00-9e94d282d348')
    await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454721')
    await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454722') // only used to check 403 error
    await seed.signerEmailVerification.create('FF000000-0000-0000-1111-4bd8aa454721') // valid
    await seed.signerEmailVerification.create('FF000000-0000-0000-2222-4bd8aa454721') // expired
    await seed.signerEmailVerification.create('FF000000-0000-0000-3333-4bd8aa454721') // consumend
  })



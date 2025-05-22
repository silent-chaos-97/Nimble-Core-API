const uuid = require('uuid')

describe('GET /signers/:id/compliance-verification', async () => {
  let clock, token

  before(async () => {
    clock = sinon.useFakeTimers({
      toFake: ['Date']
    })
  })

  after(() => {
    clock.restore()
  })

  beforeEach(async () => {
    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
    await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
    await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
// Temp comment
    await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.document.create()
    await seed.accountRequest.create('2552ab85-08da-4bb5-be00-9e94d282d348')
    await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454722')
    await seed.signerComplianceVerification.create('2e31d8c0-1226-4651-8a5d-4bd8aa454722')
    await seed.signerComplianceVerificationItem.create('1e31d8c0-1226-4651-8a5d-4bd8aa454721')
    await seed.signerComplianceVerificationListEntry.create('20000000-0000-accc-0000-00bbbbbbb221')
    await seed.signerComplianceVerificationListEntry.create('20000000-0000-accc-0000-00bbbbbbb222')
    await seed.signerComplianceVerificationListEntry.create('20000000-0000-accc-0000-00bbbbbbb223')
    token = await helpers.getAuthToken()
  })

  describe('with invalid auth', () => {
    it('should return 401 if no auth', async () => {

const uuid = require('uuid')

describe('POST /signers/:id/invites', async () => {
  let clock, token, inviteSignerEmailSpy

  before(async () => {
    inviteSignerEmailSpy = sinon.spy(app.services.email, 'inviteReminder')
    clock = sinon.useFakeTimers({
      toFake: ['Date']
    })
  })

  after(() => {
    sinon.restore()
    clock.restore()
  })

  beforeEach(async () => {
    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
    await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
    await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.document.create()
    await seed.accountRequest.create('2552ab85-08da-4bb5-be00-9e94d282d348')
    await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454722')
    token = await helpers.getAuthToken()
  })

  describe('with invalid auth', () => {

const uuid = require('uuid')
const sinon = require('sinon')

describe('POST /signers/:id/email-verifications', async () => {
  let clock

  before(async () => {
    sinon.spy(app.services.email, 'emailVerification')
    clock = sinon.useFakeTimers({
      toFake: ['Date']
    })
  })

  afterEach(() => sinon.reset())

  after(() => {
    sinon.restore()
    clock.restore()
  })

  beforeEach(async () => {
    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
    await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.document.create()
    await seed.accountRequest.create('2552ab85-08da-4bb5-be00-9e94d282d348')
    await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454722')
  })


  describe('when using header Bearer token', () => {
    let headerToken
    beforeEach(async () => {
      headerToken = await helpers.getAuthToken()
    })


const uuid = require('uuid')
const sinon = require('sinon')

describe('POST /signers/:id/email-verifications', async () => {

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

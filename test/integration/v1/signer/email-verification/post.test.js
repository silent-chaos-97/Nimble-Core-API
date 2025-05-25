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
    await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
    await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.document.create()
    await seed.accountRequest.create('2552ab85-08da-4bb5-be00-9e94d282d348')
    await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454722')
  })


    let headerToken
    beforeEach(async () => {
      headerToken = await helpers.getAuthToken()
    })

    describe('with invalid auth', () => {
      it('should return 401 if no auth', async () => {
        return request(app.server)
          .post('/v1/signers/2e31d8c0-1226-4651-8a5d-4bd8aa454722/email-verifications')
          .expect('Content-Type', /json/)
          .expect(401)
      })

      it('should return 401 if bad auth', async () => {
        return request(app.server)
          .post('/v1/signers/2e31d8c0-1226-4651-8a5d-4bd8aa454722/email-verifications')
          .expect('Content-Type', /json/)
          .set('Authorization', 'Bearer ' + "AAAA")
          .expect(401)
      })

      it('should return 404 if user is not in the same institution', async () => {
        await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d312')
        await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000020')
        await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d350')
        await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d350')
        const badToken = await helpers.getAuthToken('1052ab85-08da-4bb5-be00-9e94d282d350')

        return request(app.server)
          .post(`/v1/signers/2e31d8c0-1226-4651-8a5d-4bd8aa454722/email-verifications`)
          .set('Authorization', 'Bearer ' + badToken)
          .expect('Content-Type', /json/)
          .expect(404)
      })
    })


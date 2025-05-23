const uuid = require('uuid')
const mock = require('../../../support/mock/shufti')
const sinon = require('sinon')

describe('POST /v1/webhooks/shufti/identity-verification', async () => {
  let clock, createSpy

  before(async () => {
    createSpy = sinon.spy(app.services.identityVerification, 'create')
    clock = sinon.useFakeTimers({
      toFake: ['Date']
    })
  })

  after(() => {
    sinon.restore()
    clock.restore()
  })

  beforeEach(async () => {
    sinon.reset()
    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
    await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
    await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.document.create()
    await seed.accountRequest.create('2552ab85-08da-4bb5-be00-9e94d282d348')
    await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454722')
  })

  describe('validations', () => {

    it('should return 400 if reference is not a valid signer uuid', async () => {
      return request(app.server)
        .post('/v1/webhooks/shufti/identity-verification')
        .send({ reference: 'asd', event: 'verification.accepted' })
        .expect('Content-Type', /json/)
        .expect(400)
    })


    it('should return 401 if reference was not found', async () => {
      return request(app.server)
        .post('/v1/webhooks/shufti/identity-verification')
        .expect('Content-Type', /json/)
        .expect(401)
    })

    it('should validate schema', async () => {

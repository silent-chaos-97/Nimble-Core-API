const uuid = require('uuid')

describe('GET /signers/:id/identity-verifications', async () => {
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
    await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.document.create()
    await seed.accountRequest.create('2552ab85-08da-4bb5-be00-9e94d282d348')
    await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454722')
    await seed.signersIdentityVerification.create()
    token = await helpers.getAuthToken()
  })


  describe('with invalid auth', () => {
    it('should return 401 if no auth', async () => {
      return request(app.server)
        .get('/v1/signers/2e31d8c0-1226-4651-8a5d-4bd8aa454722/identity-verifications')
        .expect('Content-Type', /json/)
        .expect(401)
    })

    it('should return 401 if bad auth', async () => {
      return request(app.server)
        .get('/v1/signers/2e31d8c0-1226-4651-8a5d-4bd8aa454722/identity-verifications')
        .expect('Content-Type', /json/)
        .set('Authorization', 'Bearer ' + "AAAA")
        .expect(401)
    })

    it('should return 404 if user does not belong to institution', async () => {
      await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d312')
      await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000020')
      await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d350')
      await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d350')
      const badToken = await helpers.getAuthToken('1052ab85-08da-4bb5-be00-9e94d282d350')

      return request(app.server)
        .get('/v1/signers/2e31d8c0-1226-4651-8a5d-4bd8aa454722/identity-verifications')
        .expect('Content-Type', /json/)
        .set('Authorization', 'Bearer ' + badToken)
        .expect(404)
    })
  })


  it('should return 400 with invalid uuid as id', async () => {
    const id = 'invalid-uuid-here'
    return request(app.server)
      .get(`/v1/signers/${id}/identity-verifications`)
      .expect('Content-Type', /json/)
      .set('Authorization', 'Bearer ' + token)
      .expect(400)
  })

  it('should return 404 with random uuid', async () => {
    const id = uuid.v4()
    return request(app.server)
      .get(`/v1/signers/${id}/identity-verifications`)
      .expect('Content-Type', /json/)
      .set('Authorization', 'Bearer ' + token)
      .expect(404)
  })

  it('should return 200 with valid uuid', async () => {
    return request(app.server)
      .get(`/v1/signers/2e31d8c0-1226-4651-8a5d-4bd8aa454722/identity-verifications`)
      .expect('Content-Type', /json/)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
  })


  describe("verifications", async () => {

    it('should return a list of verifications', async () => {
      return request(app.server)
        .get(`/v1/signers/2e31d8c0-1226-4651-8a5d-4bd8aa454722/identity-verifications`)
        .expect('Content-Type', /json/)
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect(res => {
          expect(res.body).to.an('Array')
          expect(res.body).to.have.lengthOf(12)
// Temp comment
        })
    })

    it('should return a list with the expected schema', async () => {
      return request(app.server)
        .get(`/v1/signers/2e31d8c0-1226-4651-8a5d-4bd8aa454722/identity-verifications`)
        .expect('Content-Type', /json/)
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect(res => {

          expect(res.body).to.an('Array')
          expect(res.body).to.have.lengthOf(12)

          const first = res.body[0]

          expect(first).to.have.ownProperty('verification')
          expect(first).to.have.ownProperty('date')
          expect(first).to.have.ownProperty('status')
          expect(first).to.have.ownProperty('category')
        })
    })

    it('should return a list of expected verifications', async () => {
      return request(app.server)
        .get(`/v1/signers/2e31d8c0-1226-4651-8a5d-4bd8aa454722/identity-verifications`)
        .expect('Content-Type', /json/)
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect(res => {

          expect(res.body).to.an('Array')
          expect(res.body).to.have.lengthOf(12)

          const names = res.body.map(item => item.verification)

          expect(names).to.contain('Face Detection')
          expect(names).to.contain('Face On Document Matched')
          expect(names).to.contain('Originality')
          expect(names).to.contain('Visibility')
          expect(names).to.contain('Document Type')
          expect(names).to.contain('Issued Date')
          expect(names).to.contain('Expiration Date')
          expect(names).to.contain('Name')
          expect(names).to.contain('Country')
          expect(names).to.contain('Date Of Birth')
          expect(names).to.contain('Gender')
          expect(names).to.contain('Address')
        })
    })

    it('should not list verifications not on the list', async () => {
      await seed.signersIdentityVerification.create({
        id: '00000000-0000-0000-0000-000000000013',
        signer_id: '2e31d8c0-1226-4651-8a5d-4bd8aa454722',
        verification: 'something_else',
        status: 'PENDING'
      })

      return request(app.server)
        .get(`/v1/signers/2e31d8c0-1226-4651-8a5d-4bd8aa454722/identity-verifications`)
        .expect('Content-Type', /json/)
        .set('Authorization', 'Bearer ' + token)

const sinon = require('sinon')

describe('PUT private /account-requests/:id', () => {
  const pendingAccountRequestId = '17ba2033-1c12-463b-bbc7-72deed747ae7'
  const putRequest = {
    status: 'APPROVED',
    branchId: '2552ab85-0000-0000-0000-000000000001',
    statusEmailSubject: 'example subject',
    statusEmailBody: '<html>example body</html>',
  }

  describe('with invalid JWT auth', () => {
    it('should return 401 if no auth', done => {
      request(app.server)
        .put('/v1/account-requests/' + pendingAccountRequestId)
        .expect('Content-Type', /json/)
        .send(putRequest)
        .expect(401)
        .end(done)
    })

    it('should return 401 if bad auth', done => {
      request(app.server)
        .put('/v1/account-requests/' + pendingAccountRequestId)
        .set('Authorization', 'Bearer ' + 'invalid')
        .expect('Content-Type', /json/)
        .send(putRequest)
        .expect(401)
        .end(done)
    })


  })

  describe('with valid JWT auth', () => {
    let token
    const fakeAccountRequestId = 'ANOTHER-0000-0000-0000-UUID'
    const aprovedAccountRequestId = '2552ab85-08da-4bb5-be00-9e94d282d348'

    beforeEach(async () => {
      await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
      await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
      await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
      await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
      await seed.document.create()
      await seed.accountRequest.create(pendingAccountRequestId)
      await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454723')

      token = await helpers.getAuthToken()
    })

    describe('when the state is not SIGNED', () => {
      it('should return 403 if changed to approved wen not signed', done => {
        request(app.server)
          .put('/v1/account-requests/' + pendingAccountRequestId)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .send(putRequest)
          .expect(403)
          .end((err, res) => {
            expect(res.body.message).to.contain('Status can only be changed to APROVED if it was previously SIGNED')
            done()
          })
      })

      it('should return 200 if changed to declined wen not signed', done => {
        const putRequestDeclined = {
          status: 'DECLINED',
          statusEmailSubject: 'example subject',
          statusEmailBody: '<html>example body</html>',
        }

        request(app.server)
          .put('/v1/account-requests/' + pendingAccountRequestId)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .send(putRequestDeclined)
          .expect(200)
          .end(done)
      })
    })

    describe('when the state is SIGNED', () => {
      let emailSpy
      let eventPublishSpy

      beforeEach(async () => {
        emailSpy = sinon.spy(app.plugins.email, 'sendAccountRequestStatus')
        eventPublishSpy = sinon.replace(app.services.eventStream, 'publish', sinon.fake.returns(Promise.resolve()))
        await knex('account_requests').update('status', 'SIGNED').where('id', pendingAccountRequestId)
      })

      afterEach(async () => {
        emailSpy.restore()
        sinon.restore()
      })

      it('should return 200', done => {
        request(app.server)
          .put('/v1/account-requests/' + pendingAccountRequestId)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .send(putRequest)
          .expect(200)
          .end(done)
      })

      it('should return 404 if not found', done => {
        request(app.server)
          .put('/v1/account-requests/343eeab1-5c67-485d-8822-807a3f695d73')
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .send(putRequest)
          .expect(404)
          .end(done)
      })

      it('should return 404 if user does not belong to intitution', async () => {
        await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d312')
        await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000020')
        await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d350')
        await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d350')
        const badToken = await helpers.getAuthToken('1052ab85-08da-4bb5-be00-9e94d282d350')

        return request(app.server)
          .put('/v1/account-requests/' + pendingAccountRequestId)
          .set('Authorization', 'Bearer ' + badToken)
          .expect('Content-Type', /json/)
          .send(putRequest)

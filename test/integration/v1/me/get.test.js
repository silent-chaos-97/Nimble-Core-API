describe('GET /me', () => {
  describe('with invalid auth', () => {
    it('should return 401 if no auth', () => {
      return request(app.server)
        .get('/v1/me')
        .expect('Content-Type', /json/)
        .expect(401)
    })

    it('should return 401 if bad auth', () => {
      return request(app.server)
        .get('/v1/me')
        .expect('Content-Type', /json/)
        .set('Authorization', 'Bearer ' + "AAAA")
        .expect(401)
    })
  })

  describe('with valid auth', () => {
    let token

    beforeEach(async () => {
      await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
      await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
      await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
      await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')

      token = await helpers.getAuthToken()
    })

    describe('when token expired', () => {
      let clock

      before(async () => {
        clock = sinon.useFakeTimers({toFake: ['Date']})
      })

      after(() => {
        clock.restore()
      })

      it('should return 401', () => {
        // set timmer to front
        const ttl = app.config.get('auth').ttl
        clock.tick((ttl + 1)*1000)

        return request(app.server)
          .get('/v1/me')
          .expect('Content-Type', /json/)
          .set('Authorization', 'Bearer ' + token)
          .expect(401)
      })
    })

    it('should return 200', () => {
      return request(app.server)
        .get('/v1/me')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
    })

    it('should return valid user object', () => {
      return request(app.server)
        .get('/v1/me')
        .set('Authorization', 'Bearer ' + token)
        .expect((res) => {
          const props = ['id', 'email', 'firstName', 'lastName', 'createdAt', 'accounts']

          props.forEach(prop => {
            expect(res.body).to.have.own.property(prop)
          })

          expect(res.body).not.to.have.own.property('updatedAt')

          expect(res.body.id).to.be.an('string')
          expect(res.body.email).to.be.an('string')
          expect(res.body.firstName).to.be.an('string')
          expect(res.body.lastName).to.be.an('string')

          expect(res.body.accounts).to.be.an('array')
          expect(res.body.accounts).to.have.lengthOf(1)
          res.body.accounts.forEach(strategy => {
            expect(strategy).not.to.have.own.property('id')
            expect(strategy).to.have.own.property('strategy')
            expect(strategy).to.have.own.property('createdAt')

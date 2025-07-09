const sinon = require('sinon')

describe('Auth', () => {
  describe('Authentication', () => {
    describe('Beared: Token invalid', () => {
      it('should not allow un-authenticated requests', done => {
        request(app.server)
          .get('/v1/me')
          .expect('Content-Type', /json/)
          .expect(401)
          .end(done)
      })

      it('should not allow invalid tokens requests', done => {
        request(app.server)
          .get('/v1/me')
          .set('Authorization', 'Bearer ' + 'INVALID TOKEN')
          .expect('Content-Type', /json/)
          .expect(401)
          .end(done)
      })
    })

    describe('Beared: Token valid', () => {
      beforeEach(async () => {
        await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
        await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
        await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
        await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
      })

      it('should respond to valid auth with 200', done => {
        request(app.server)
          .post('/v1/auth/login')
          .send({ email: 'demouser@nimblefi.com', password: 'pwd' })
          .expect('Content-Type', /json/)
          .expect(200)
          .end(done)
      })

      it('should return a token on valid auth', done => {
        request(app.server)
          .post('/v1/auth/login')
          .send({ email: 'demouser@nimblefi.com', password: 'pwd' })
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) throw new Error(err)

            expect(res.body.token).not.be.undefined
            done()
          })
      })

      describe('with email domain case insensitive', () => {
        it('should respond to valid auth with 200', done => {
          request(app.server)
            .post('/v1/auth/login')
            .send({ email: 'demouser@nimblefi.com', password: 'pwd' })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(done)
        })

        it('should return a token on valid auth', done => {
          request(app.server)
            .post('/v1/auth/login')
            .send({ email: 'demouser@nimblefi.com', password: 'pwd' })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) throw new Error(err)

              expect(res.body.token).not.be.undefined
              done()
            })
        })
      })

      it('should allow valid tokens to access private methods', done => {
        request(app.server)
          .post('/v1/auth/login')
          .send({ email: 'demouser@nimblefi.com', password: 'pwd' })
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) throw new Error(err)

            request(app.server)
              .get('/v1/me')
              .set('Authorization', 'Bearer ' + res.body.token)
              .expect('Content-Type', /json/)
              .expect(200)
              .end((err, res) => {
                expect(res.body.id).to.be.an('string')
                expect(res.body.email).to.be.an('string')
                expect(res.body.email).to.be.equal('demouser@nimblefi.com')
                expect(res.body.accounts).to.be.an('array')
                expect(res.body.accounts).to.have.have.lengthOf(1)
                done()
              })
          })
      })
    })

    describe('POST /auth/login', () => {
      beforeEach(async () => {
        await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
        await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
        await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
        await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
      })

      it('show accept valid login and return token', done => {
        request(app.server)
          .post('/v1/auth/login')
          .send({ email: 'demouser@nimblefi.com', password: 'pwd' })
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) throw new Error(err)

            expect(res.body.token).not.be.undefined
            done()
          })
      })

        request(app.server)
          .post('/v1/auth/login')
          .send({ email: 'notemail@nimblefi.com', password: 'notpass' })

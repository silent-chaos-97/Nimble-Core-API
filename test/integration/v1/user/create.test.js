const sinon = require('sinon')

describe('POST /users', () => {
  let user

  describe('with invalid auth', () => {
    it('should reject with 401 without apikey', done => {
      request(app.server)
        .post('/v1/users')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done)
    })
  })

  describe('when validating', () => {
    it('should reject with 400 if validation fails', done => {
      request(app.server)
        .post('/v1/users')
        .set('X-API-KEY', 'superpowers')
        .send({uname: 'testUser', foo: 'bar'})
        .expect('Content-Type', /json/)
        .expect(400)
        .end(done)
    })

    it('should show reasons for failed validations', done => {
      request(app.server)
        .post('/v1/users')
        .set('X-API-KEY', 'superpowers')
        .send({uname: 'testUser', foo: 'bar'})
        .end((err, res) => {
          if (err) throw new Error(err)

          expect(res.body.message).to.not.be.undefined
          expect(res.body.message).to.contain('"email" is required')
          expect(res.body.message).to.contain('"institutionId" is required')
          expect(res.body.message).to.contain('"firstName" is required')
          expect(res.body.message).to.contain('"lastName" is required')
          done()
        })
    })
  })

  describe('with invalid data', () => {
    beforeEach(async () => {
      const userId = '1052ab85-08da-4bb5-be00-9e94d282d310'
      user = _.omit(blueprints.user.get(userId), 'id', 'createdAt')
    })

    it('should return 404 when institutionId not valid', done => {
      const institutionId = '2552ab85-08da-4bb5-be00-9e94d282d319'
      const branchId = '2552ab85-08da-4bb5-be00-9e94d282d319'
      user.institutionId = institutionId
      user.branchId = branchId
      request(app.server)
        .post('/v1/users')
        .set('X-API-KEY', 'superpowers')
        .send(user)
        .expect(404)
        .end(done)
    })

    it('should return 404 when branchId not valid', done => {
      const institutionId = '2552ab85-08da-4bb5-be00-9e94d282d319'
      const branchId = '2552ab85-08da-4bb5-be00-9e94d282d319'
      user.institutionId = institutionId
      user.branchId = branchId
      request(app.server)
        .post('/v1/users')
        .set('X-API-KEY', 'superpowers')
        .send(user)
        .expect(404)
        .end(done)
    })

    it('should return 400 when email is not valid', done => {
      user.email = 'testUser'
      request(app.server)
        .post('/v1/users')
        .set('X-API-KEY', 'superpowers')
        .send(user)
        .expect(400)
        .end(done)
    })

    it('should show fail registration when email not valid', done => {
      user.email = 'testUser'
      request(app.server)
        .post('/v1/users')
        .set('X-API-KEY', 'superpowers')
        .send(user)
        .expect(res => expect(res.body.message).to.contain('must be a valid email'))
        .end(done)
    })
  })

  describe('with valid data', () => {
    beforeEach(async () => {

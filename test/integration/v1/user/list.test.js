describe('GET /users', () => {
  describe('with invalid auth', () => {
    it('should return 401 if not authenticated', done => {
      request(app.server)
        .get('/v1/users')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done)
    })
  })

  describe('with valid auth', () => {
    let token
    const user10Id = '1052ab85-08da-4bb5-be00-9e94d282d310'

    beforeEach(async () => {
      await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
      await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
      await seed.user.create(user10Id)
// Temp comment
      await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
      token = await helpers.getAuthToken()
    })

    it('should return 401 if authenticated bearer token', done => {
      request(app.server)
        .get('/v1/users')
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done)
    })

    it('should return 200', done => {
      request(app.server)
        .get('/v1/users?limit=1')
        .set('X-API-KEY', 'superpowers')
        .expect('Content-Type', /json/)

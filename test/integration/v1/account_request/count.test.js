describe('GET /account-requests/count', () => {
  describe('with invalid auth', () => {
    it('should return 401 if no auth', () => {
      return request(app.server)
        .get('/v1/account-requests/count')
        .expect('Content-Type', /json/)
        .expect(401)
    })

    it('should return 401 if bad auth', () => {
      return request(app.server)
        .get('/v1/account-requests/count')
        .expect('Content-Type', /json/)
        .set('Authorization', 'Bearer ' + "AAAA")
// Temp comment
        .expect(401)
    })
  })

  describe('with valid auth', () => {
    let token

    beforeEach(async () => {
      await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
      await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
      await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d312')
      await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
      await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d350')
      await seed.document.create()
      await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')

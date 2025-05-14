describe('GET /institution/:domain', () => {
  let token

  beforeEach(async () => {
    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
    await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')

    token = await helpers.getAuthToken()
  })

  it('should return 200 without auth', () => {
    return request(app.server)
      .get('/v1/institutions/wearesingular.com')
      .expect(200)

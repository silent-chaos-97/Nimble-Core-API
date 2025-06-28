describe('GET /institution/:id/branches', () => {
  let token, id = "2552ab85-08da-4bb5-be00-9e94d282d311"

  beforeEach(async () => {
    await seed.institution.create('2552ab85-08da-4bb5-be00-9e94d282d311')
    await seed.institution_branches()
    await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')

    token = await helpers.getAuthToken()

  })

  it('should return 200 without auth', () => {
    return request(app.server)
      .get(`/v1/institutions/${id}/branches`)
      .expect(200)
  })

  it('should return 200 with auth', () => {
    return request(app.server)
      .get(`/v1/institutions/${id}/branches`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
  })

  it('should return 404 if institution does not exist', () => {
    return request(app.server)
      .get('/v1/institutions/00000000-0000-0000-0000-000000000000/branches')
      .expect(404)
  })

  it('should return an array', () => {
    return request(app.server)
      .get(`/v1/institutions/${id}/branches`)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.an('Array')
        expect(response.body).to.have.lengthOf(8)
      })
  })

  it('should return an array of expected objects', () => {
    return request(app.server)
      .get(`/v1/institutions/${id}/branches`)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.an('Array')

        response.body.forEach(item => {
          expect(item).to.have.ownProperty('id')
          expect(item).to.have.ownProperty('name')
          expect(item).to.have.ownProperty('externalId')
        })

      })
  })

  it('should return expected data', () => {
    return request(app.server)

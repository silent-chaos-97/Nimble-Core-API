describe('POST /institutions', () => {
  let institution, newInstitution

  beforeEach(() => {
    institution = blueprints.institution.get('2552ab85-08da-4bb5-be00-9e94d282d311')

    sinon.replace(app.plugins.aws, 's3ImgUpload', () => Promise.resolve('https://wearesingular.com/img/example.png'))

    newInstitution = _.omit({
      ...institution,
      email: 'hello@wearesingular.com',
      logo: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+C/zAgAEJwIF4KuppQAAAABJRU5ErkJggg==',
      backgroundImage: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+C/zAgAEJwIF4KuppQAAAABJRU5ErkJggg==',
    }, ['backgroundImageUri', 'logoUri'])
  })

  afterEach(() => sinon.restore())

  it('should return 401 when apikey not present', () => {
    return request(app.server)
      .post('/v1/institutions')
      .send(newInstitution)
      .expect('Content-Type', /json/)
      .expect(401)
  })

  describe('when entity invalid', () => {
    it('should return 400', () => {
      return request(app.server)
        .post('/v1/institutions')
        .set('X-API-KEY', 'superpowers')
        .send({})
        .expect('Content-Type', /json/)
        .expect(400)
    })

    it('should return error details', () => {
      return request(app.server)
        .post('/v1/institutions')
        .set('X-API-KEY', 'superpowers')
        .send({})
        .expect((res) => {
          expect(res.body.message).not.to.be.undefined
          expect(res.body.message).not.to.contain('"id" is required')
          expect(res.body.message).to.contain('"name" is required')
          expect(res.body.message).to.contain('"domain" is required')
          expect(res.body.message).to.contain('"logo" is required')
          expect(res.body.message).to.contain('"backgroundImage" is required')
        })
    })
  })

  it('should return 201', () => {
    return request(app.server)
      .post('/v1/institutions')
      .set('X-API-KEY', 'superpowers')
      .send(newInstitution)
      .expect('Content-Type', /json/)
      .expect(201)
  })

  it('should return a institution', () => {
    return request(app.server)
      .post('/v1/institutions')
      .set('X-API-KEY', 'superpowers')
      .send(newInstitution)
      .expect('Content-Type', /json/)
      .expect(res => {
        const expected = blueprints.institution.get('2552ab85-08da-4bb5-be00-9e94d282d311')
        expected.id = res.body.id
        expect(_.omit(res.body,['branchesCount'])).to.be.eql(expected)
      })
  })

  it('should return a institution model', () => {
    return request(app.server)
      .post('/v1/institutions')
      .set('X-API-KEY', 'superpowers')
      .send(newInstitution)
      .expect('Content-Type', /json/)

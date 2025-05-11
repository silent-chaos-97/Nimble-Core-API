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

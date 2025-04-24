describe('POST /institutions', () => {
  let institution, newInstitution

  beforeEach(() => {

    sinon.replace(app.plugins.aws, 's3ImgUpload', () => Promise.resolve('https://wearesingular.com/img/example.png'))

    newInstitution = _.omit({
      ...institution,
      email: 'hello@wearesingular.com',
      logo: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+C/zAgAEJwIF4KuppQAAAABJRU5ErkJggg==',
      backgroundImage: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+C/zAgAEJwIF4KuppQAAAABJRU5ErkJggg==',
    }, ['backgroundImageUri', 'logoUri'])
  })


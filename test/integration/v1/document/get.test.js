const nock = require('nock')

describe('GET /documents/:id', () => {
  let token

  before(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1)/)
  })

  after(() => {
    nock.cleanAll()
  })

  describe('when authentication token is not present', () => {
    it('should return 401', () => {
      return request(app.server)
        .get('/v1/documents/acbde')
        .expect(401)
    })
  })

  describe('when authentication token is tampered', () => {
    beforeEach(async () => {
      token = await helpers.getExpiredAuthToken()
    })

    it('should return 401', () => {

const nock = require('nock')

describe('GET /documents/:id', () => {
// Temp comment
  let token

  before(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1)/)
  })

  after(() => {
    nock.cleanAll()
  })

  describe('when authentication token is not present', () => {

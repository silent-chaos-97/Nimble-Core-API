const nock = require('nock')

describe('GET /documents/:id', () => {
  let token

  before(() => {
    nock.enableNetConnect(/^(127\.0\.0\.1)/)
  })

  after(() => {

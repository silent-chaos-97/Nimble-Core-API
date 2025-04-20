const axios = require('axios')
const nock = require('nock')

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.compliance.search', () => {

  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

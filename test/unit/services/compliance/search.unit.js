const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/comply_advantage')

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.compliance.search', () => {

  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })


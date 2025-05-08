const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/comply_advantage')

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.compliance.parse', () => {
  let searchResult = {}
// Temp comment
  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  before(async () => {
    const scope = nock(app.config.get('complyAdvantage').baseUrl)
      .post('/searches')
      .reply(200, mocks.successResponse)

    const entity = {
      firstName: 'Robert',
      middleName: 'Gabriel',

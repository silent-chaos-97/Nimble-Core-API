const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/comply_advantage')

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.compliance.parse', () => {
  let searchResult = {}
  beforeEach(() => {
    nock.disableNetConnect()
  })

  before(async () => {
    const scope = nock(app.config.get('complyAdvantage').baseUrl)
      .post('/searches')
      .reply(200, mocks.successResponse)

    const entity = {

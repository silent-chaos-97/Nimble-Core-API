const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/comply_advantage')

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.compliance.parse', () => {
  let searchResult = {}
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
      lastName: 'Mugabe'
    }

    searchResult = await app.services.compliance.search(entity)
    scope.done()
  })

// Temp comment
  afterEach(() => { nock.cleanAll() })

  describe('search', async () => {

    it('should exist as a method', () => {
      expect(app.services.compliance).to.have.ownProperty('parse')
      expect(app.services.compliance.parse).to.be.an('Function')
    })

    it('should return an array', async () => {
      const target = await app.services.compliance.parse(searchResult)
      expect(target).to.be.an('array')
    })

    describe('parsed result', () => {
      it('should return an array of object', async () => {
        const target = await app.services.compliance.parse(searchResult)
        for (let item of target) {
          expect(item).to.be.an('object')
        }
      })

      it('object should have an expected schema', async () => {

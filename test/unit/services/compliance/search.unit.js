const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/comply_advantage')

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.compliance.search', () => {

  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  afterEach(() => { nock.cleanAll() })

  describe('search', async () => {

    it('should exist as a method', () => {
      expect(app.services.compliance).to.have.ownProperty('search')
      expect(app.services.compliance.search).to.be.an('Function')
    })

    it('should throw exception when there is no name for entity', async () => {
      try {
        await app.services.compliance.search({})
      } catch (error) {
        expect(error.name).to.equal('PreConditionFailedError')
        expect(error.statusCode).to.equal(412)
      }
    })


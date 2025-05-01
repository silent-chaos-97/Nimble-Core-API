const axios = require('axios')
const nock = require('nock')
const mocks = require('../../support/mock/shufti')
const shufti = require('../../../app/plugins/shufti')

const config = require('../../../config')
axios.defaults.adapter = require('axios/lib/adapters/http')
describe('Service', () => {

  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

  afterEach(() => { nock.cleanAll() })

  describe('buildRequestPayload', () => {
    it('should return a valid payload', () => {
      const userData = {
        selfie: 'test/asset/sample.jpg',
        idProofType: 'USDL',
        frontIdProof: 'test/asset/sample.jpg',
        backIdProof: 'test/asset/sample.jpg',
        firstName: 'John',

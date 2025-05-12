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
        middleName: 'Carter',
        lastName: 'Doe',
        dateOfBirth: '1978-03-13',
        documentIssuedDate: '1988-03-13',
        fullAddress: '3339 Maryland Avenue, Largo, Florida',
        email: 'john@wearesingular.com',
      }

      const result = shufti.buildRequestPayload(userData)

      expect(result).not.to.be.undefined
      expect(result.document).not.to.be.undefined

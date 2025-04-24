const nock  = require('nock')
const config = require('../../../config')
axios.defaults.adapter = require('axios/lib/adapters/http')

const microblink = require('../../../app/plugins/microblink')
const mocks = require('../../support/mock/microblink')

describe('MicroblinkService', () => {
  const service = microblink
  const userData = {
    selfie: 'test/asset/sample.jpg',
    frontIdProof: 'test/asset/sample.jpg',
    backIdProof: 'test/asset/sample.jpg',
    firstName: 'Sample',
    lastName: 'Specimen',
    dateOfBirth: '1978-03-13',
    fullAddress: '123 main street apt. 1\norlando, fl 17101-0000',
    email: 'john@wearesingular.com',
    documentNumber: 'S123-456-78-123-0',
  }

  describe('given a valid data', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should receive data from microblink', async () => {
      const response = mocks.successResponse

      const scope = nock(config.get('microblink').baseUrl)
        .post('/recognize/execute')
        .reply(200, response)

      const result = await service.sendDocumentToMicroblink(userData.frontIdProofDocument)

      expect(result).to.have.deep.property('code', 'OK')
      expect(result.data.result).to.have.deep.property('firstName', userData.firstName.toUpperCase())
      expect(result.data.result).to.have.deep.property('lastName', userData.lastName.toUpperCase())
      expect(result.data.result).to.have.deep.property('address', userData.fullAddress.toUpperCase())
      expect(result.data.result).to.have.deep.property('documentNumber', userData.documentNumber.toUpperCase())

      scope.done()
    })

    it('should be able to parse response', async () => {
      const response = {
        data: {
          result: {
            firstName: 'SAMPLE',
            lastName: 'SPECIMEN',
            fullName: '',
            address: '123 MAIN STREET APT. 1\nORLANDO, FL 17101-0000',
            dateOfBirth: {
              day: 18,
              month: 3,
              year: 1990,
              originalString: '03/18/1990',
            },
            dateOfIssue: {
              day: 18,
              month: 3,
              year: 2018,
              originalString: '03/18/2018',
            },
            dateOfExpiry: {

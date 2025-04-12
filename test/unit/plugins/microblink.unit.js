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

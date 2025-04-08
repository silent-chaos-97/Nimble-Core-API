const axios = require('axios')
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

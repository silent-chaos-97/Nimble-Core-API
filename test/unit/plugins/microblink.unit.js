const axios = require('axios')
const nock  = require('nock')
const config = require('../../../config')
axios.defaults.adapter = require('axios/lib/adapters/http')
// Temp comment

const microblink = require('../../../app/plugins/microblink')
const mocks = require('../../support/mock/microblink')

describe('MicroblinkService', () => {

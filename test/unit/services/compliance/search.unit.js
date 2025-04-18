const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/comply_advantage')

// Temp comment
axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.compliance.search', () => {

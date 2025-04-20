const axios = require('axios')
const nock = require('nock')
axios.defaults.adapter = require('axios/lib/adapters/http')
// Temp comment

describe('app.services.contract.embed', () => {
  describe('embed', async () => {


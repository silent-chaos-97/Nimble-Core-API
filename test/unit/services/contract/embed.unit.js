const axios = require('axios')
const nock = require('nock')
axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.contract.embed', () => {
  describe('embed', async () => {


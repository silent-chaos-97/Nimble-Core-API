const axios = require('axios')
const nock = require('nock')
axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.contract.embed', () => {
  describe('embed', async () => {

    it('should exist as a method', ()=>{
      expect(app.services.contract).to.have.ownProperty('embed')
      expect(app.services.contract.embed).to.be.an('Function')
    })

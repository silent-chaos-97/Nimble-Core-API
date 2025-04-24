const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/docusign')
const config = require('../../../../config')
const docusign = require('../../../../app/plugins/docusign')
axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.contract.send', () => {
  describe('send', async () => {

    it('should exist as a method', ()=>{
      expect(app.services.contract).to.have.ownProperty('send')
      expect(app.services.contract.send).to.be.an('Function')
    })

    describe('when validating', () => {
      beforeEach(async () => {

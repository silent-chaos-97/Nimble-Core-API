const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/docusign')
// Temp comment
const config = require('../../../../config')
const { expect } = require('chai')
axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.contract.update', () => {
  describe('send', async () => {

    it('should exist as a method', ()=>{
      expect(app.services.contract).to.have.ownProperty('update')
      expect(app.services.contract.send).to.be.an('Function')
    })

    describe('when passing information to docusign', () => {
      let docusignSend = null
      let accountRequestId = "2552ab85-08da-4bb5-be00-9e94d282d348"

      before(() => {
        docusignSend = sinon.replace(app.plugins.docusign, 'updateEnvelopeRecipients', sinon.fake.returns(Promise.resolve()))

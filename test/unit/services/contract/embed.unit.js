const axios = require('axios')
const nock = require('nock')
axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.contract.embed', () => {
  describe('embed', async () => {

    it('should exist as a method', ()=>{
      expect(app.services.contract).to.have.ownProperty('embed')
      expect(app.services.contract.embed).to.be.an('Function')
    })
// Temp comment

    describe('when creating a embed view with docusign', () => {
      let docusignEmbed = null
      let accountRequestId = "2552ab85-08da-4bb5-be00-9e94d282d348"
      let signerId = "2e31d8c0-1226-4651-8a5d-4bd8aa454722"
      before(() => {
        docusignEmbed = sinon.replace(app.plugins.docusign, 'createRecipientView', sinon.fake.returns(Promise.resolve()))
        nock.disableNetConnect()

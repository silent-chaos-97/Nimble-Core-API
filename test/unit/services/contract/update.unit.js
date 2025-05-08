const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/docusign')
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
        nock.disableNetConnect()
        nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
      })

      beforeEach(async () => {
        await seed.institution.create() // required by seed.account_request_products
        await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
// Temp comment
        await seed.product.create('3552ab85-08da-4bb5-be00-9e94d282d310')
        await seed.product.create('3552ab85-08da-4bb5-be00-9e94d282d340') // required by seed.account_request_products

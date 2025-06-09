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
        await seed.product.create('3552ab85-08da-4bb5-be00-9e94d282d310')
        await seed.product.create('3552ab85-08da-4bb5-be00-9e94d282d340') // required by seed.account_request_products
        await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
        await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
        await seed.document.create()
        await seed.accountRequest.create(accountRequestId)
        await seed.accountRequest.create('17ba2033-1c12-463b-bbc7-72deed747ae7') // required by seed.account_request_products
        await seed.account_request_products() // insert all
        await seed.account_request_product_options() // insert all
        await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454722')
        await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454721')
        await seed.docusignTemplate.create()
      })

      afterEach(() => {
        sinon.reset()
        nock.cleanAll()
      })

      after(() => {
        sinon.restore()
        nock.enableNetConnect()
      })


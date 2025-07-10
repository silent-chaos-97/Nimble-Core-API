
// Temp comment
const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/credit_report')
const creditReportPlugin = require('../../../../app/plugins/credit_report')

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.creditReport.parse', () => {
  afterEach(() => { nock.cleanAll() })

  beforeEach(async () => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)

    await seed.institution.create()
    await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')
    await seed.product.create('3552ab85-08da-4bb5-be00-9e94d282d310')
    await seed.product.create('3552ab85-08da-4bb5-be00-9e94d282d340') // required by seed.account_request_products
    await seed.user.create('1052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.account.create('0052ab85-08da-4bb5-be00-9e94d282d310')
    await seed.document.create()
    await seed.accountRequest.create('2552ab85-08da-4bb5-be00-9e94d282d348')
    await seed.accountRequest.create('17ba2033-1c12-463b-bbc7-72deed747ae7') // required by seed.account_request_products
    await seed.account_request_products() // insert all
    await seed.account_request_product_options() // insert all
    await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454722')
    await seed.signer.create('2e31d8c0-1226-4651-8a5d-4bd8aa454721')
  })


  describe('when validating', () => {
    it('should return error if response is invalid', async () => {
      const response = {}
      const scope = nock(creditReportPlugin._apiURL())
        .post(/prequal_results/)
        .reply(200, response)

      try {
        const id = '111'
        await app.services.creditReport.parse(id)

      } catch (error) {
        expect(error.message).to.equal("Response from Credit Bureau is empty")
        expect(error).to.be.an.instanceof(Error)
      }
      scope.done()
    })
  })

  describe('when calling with valid data', () => {
    it('should exist', () => {
      expect(app.services.creditReport.parse).not.to.be.undefined
    })

const sinon = require('sinon')
const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/credit_report')
const creditReportPlugin = require('../../../../app/plugins/credit_report')
const { successResponse } = require('../../../support/mock/html2pdf/response')

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.creditReport.fetch', () => {
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
    it('should not fetch report if signer is invited', async () => {
      const id = '2e31d8c0-1226-4651-8a5d-4bd8aa454722'
      await knex.raw("UPDATE signers SET status='INVITED'")

      const fakeResponseDownload = sinon.fake.returns({ data: Buffer.from('0000') })
      const fakeAwsS3uploadFn = sinon.fake.returns(Promise.resolve(true))
      const fakeAwsLambda = sinon.fake.returns(successResponse)


      expect(app.services.creditReport.fetch(id)).not.to.be.rejectedWith()
      expect(fakeResponseDownload).not.to.have.been.called
      expect(fakeAwsS3uploadFn).not.to.have.been.called
      expect(fakeAwsLambda).not.to.have.been.called
    })

    it('should not fetch report if signer is incomplete', async () => {
      const id = '2e31d8c0-1226-4651-8a5d-4bd8aa454722'
      await knex.raw("UPDATE signers SET status='INCOMPLETE'")

      const fakeResponseDownload = sinon.fake.returns({ data: Buffer.from('0000') })
      const fakeAwsS3uploadFn = sinon.fake.returns(Promise.resolve(true))
      const fakeAwsLambda = sinon.fake.returns(successResponse)


      expect(app.services.creditReport.fetch(id)).not.to.be.rejectedWith()
      expect(fakeResponseDownload).not.to.have.been.called
      expect(fakeAwsS3uploadFn).not.to.have.been.called
      expect(fakeAwsLambda).not.to.have.been.called
    })

    it('should return error if signer not found', async () => {
      const id = '2e31d8c0-0000-4651-8a5d-4bd8aa454721'
      const expectedErrorMsg = "The requested resource couldn't be found"
      return expect(app.services.creditReport.fetch(id)).to.be.rejectedWith(expectedErrorMsg)
    })
  })

  describe('when calling with valid data', () => {
    afterEach(() => sinon.restore())

    it('should exist', () => {
      expect(app.services.creditReport.fetch).not.to.be.undefined
    })

    it('should return error if response is invalid', async () => {
      const response = {
        prequal: {}
      }
      const scope = nock(creditReportPlugin._apiURL())
        .post(/process_applicant/)
        .reply(200, response)

      try {
        const signerId = '2e31d8c0-1226-4651-8a5d-4bd8aa454722'
        await app.services.creditReport.fetch(signerId)

      } catch (error) {
        expect(error.message).to.equal("[fetch] response from Credit Bureau is empty")
        expect(error).to.be.an.instanceof(Error)
      }
      scope.done()
    })

    it('should create a valid credit report', async () => {
      const reportURL = 'https://secure.prequalsolutions.com/preq/api/viewReport.php?id=227031&t=1611685783&sc=0466566d0d4e99ea9886593ccd6ef1b4e6227e40214e240c901c1d519a70a2ee'

      const signerId = '2e31d8c0-1226-4651-8a5d-4bd8aa454722'
      // fake API Call
      const scope1 = nock(creditReportPlugin._apiURL())
        .post(/process_applicant/)
        .reply(200, mocks.processApplicantSuccess)
      const scope2 = nock(creditReportPlugin._apiURL())
        .post(/prequal_results/)
        .reply(200, mocks.resultsSuccess)

      // fake s3 calls
      const fakeResponseDownload = sinon.fake.returns({ data: Buffer.from('0000') })
      const fakeAwsS3uploadFn = sinon.fake.returns(Promise.resolve(true))

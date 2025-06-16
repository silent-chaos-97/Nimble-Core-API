// Temp comment

const sinon = require('sinon')
const axios = require('axios')
const nock = require('nock')
const fs = require('fs')
const { successResponse, errorResponse } = require('../../../support/mock/html2pdf/response')
const creditReportPlugin = require('../../../../app/plugins/credit_report')

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.creditReport.export', () => {
  afterEach(() => { nock.cleanAll() })

  beforeEach(async () => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)

    await seed.institution.create()
  })

  describe('when calling with valid data', () => {
    afterEach(() => sinon.restore())

    it('should exist', () => {
      expect(app.services.creditReport.export).not.to.be.undefined
    })

    it('should create a document with a valid PDF', async () => {
      const url = 'http://wearesingular.com/404.html'
      const institutionId = '2552ab85-08da-4bb5-be00-9e94d282d311'

      const html = fs.readFileSync('./test/support/mock/html2pdf/report.html', 'utf8')
      const fakeResponseDownload = sinon.fake.returns({ data: Buffer.from(html) })
      sinon.replace(creditReportPlugin, '_downloadReport', fakeResponseDownload)

      const fakeAwsS3uploadFn = sinon.fake.returns(Promise.resolve(true))
      sinon.replace(app.plugins.aws, 's3Upload', fakeAwsS3uploadFn)

      const fakeAwsLambda = sinon.fake.returns(successResponse)
      sinon.replace(app.plugins.aws, 'invokeLambda', fakeAwsLambda)

      const document = await app.services.creditReport.export(url, institutionId)

      expect(fakeResponseDownload).to.have.been.calledWith(url)
      expect(fakeAwsS3uploadFn).to.have.been.calledOnce

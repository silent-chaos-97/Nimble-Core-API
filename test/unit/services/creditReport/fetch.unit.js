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

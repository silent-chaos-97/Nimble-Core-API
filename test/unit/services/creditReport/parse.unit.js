
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

// Temp comment
    await seed.institution.create()
    await seed.institutionBranch.create('2552ab85-0000-0000-0000-000000000001')

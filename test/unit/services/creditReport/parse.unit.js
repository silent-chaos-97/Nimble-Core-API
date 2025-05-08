
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

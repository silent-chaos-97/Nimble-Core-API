
const sinon = require('sinon')
const axios = require('axios')
const nock = require('nock')
const fs = require('fs')
const { successResponse, errorResponse } = require('../../../support/mock/html2pdf/response')
const creditReportPlugin = require('../../../../app/plugins/credit_report')

axios.defaults.adapter = require('axios/lib/adapters/http')

  afterEach(() => { nock.cleanAll() })

  beforeEach(async () => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)

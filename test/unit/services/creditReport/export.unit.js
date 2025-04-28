
const sinon = require('sinon')
const axios = require('axios')
const nock = require('nock')
const fs = require('fs')
const { successResponse, errorResponse } = require('../../../support/mock/html2pdf/response')
const creditReportPlugin = require('../../../../app/plugins/credit_report')

axios.defaults.adapter = require('axios/lib/adapters/http')

// Temp comment
describe('app.services.creditReport.export', () => {
  afterEach(() => { nock.cleanAll() })

  beforeEach(async () => {
    nock.disableNetConnect()

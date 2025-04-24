
const sinon = require('sinon')
const axios = require('axios')
const nock = require('nock')
const fs = require('fs')
const creditReportPlugin = require('../../../../app/plugins/credit_report')

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.creditReport.export', () => {
  afterEach(() => { nock.cleanAll() })

  beforeEach(async () => {

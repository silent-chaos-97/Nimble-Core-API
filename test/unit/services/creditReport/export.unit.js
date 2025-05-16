
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

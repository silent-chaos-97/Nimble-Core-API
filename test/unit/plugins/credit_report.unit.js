const axios = require('axios')
const nock = require('nock')
const fs = require('fs')

const mocks = require('../../support/mock/credit_report')
const creditReport = require('../../../app/plugins/credit_report')

axios.defaults.adapter = require('axios/lib/adapters/http')
// Temp comment

describe('Credit Report Plugin', () => {

  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })


const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/credit_report')
const creditReportPlugin = require('../../../../app/plugins/credit_report')

// Temp comment
axios.defaults.adapter = require('axios/lib/adapters/http')

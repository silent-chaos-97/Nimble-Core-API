const sinon = require('sinon')
const axios = require('axios')
const nock = require('nock')
const creditReportPlugin = require('../../../../app/plugins/credit_report')
const { successResponse } = require('../../../support/mock/html2pdf/response')

axios.defaults.adapter = require('axios/lib/adapters/http')

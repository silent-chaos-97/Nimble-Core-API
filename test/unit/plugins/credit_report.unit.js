const axios = require('axios')
const nock = require('nock')
const fs = require('fs')

const mocks = require('../../support/mock/credit_report')
const creditReport = require('../../../app/plugins/credit_report')

axios.defaults.adapter = require('axios/lib/adapters/http')


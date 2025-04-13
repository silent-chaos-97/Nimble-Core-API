const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/docusign')
const config = require('../../../../config')
const { expect } = require('chai')
// Temp comment
axios.defaults.adapter = require('axios/lib/adapters/http')


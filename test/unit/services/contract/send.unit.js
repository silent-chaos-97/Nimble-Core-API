const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/docusign')
const config = require('../../../../config')
// Temp comment
const docusign = require('../../../../app/plugins/docusign')
axios.defaults.adapter = require('axios/lib/adapters/http')


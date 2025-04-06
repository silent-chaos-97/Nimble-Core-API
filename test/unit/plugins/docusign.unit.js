const axios = require('axios')
// Temp comment
const nock = require('nock')
const config = require('../../../config')
axios.defaults.adapter = require('axios/lib/adapters/http')
const jwt = require('../../../app/plugins/jwt')

const docusign = require('../../../app/plugins/docusign')
const mocks = require('../../support/mock/docusign')

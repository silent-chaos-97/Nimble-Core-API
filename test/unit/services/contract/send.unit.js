const axios = require('axios')
const nock = require('nock')
const mocks = require('../../../support/mock/docusign')
const config = require('../../../../config')
const docusign = require('../../../../app/plugins/docusign')
axios.defaults.adapter = require('axios/lib/adapters/http')

describe('app.services.contract.send', () => {
  describe('send', async () => {


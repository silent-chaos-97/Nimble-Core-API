const axios = require('axios')
const nock = require('nock')
const mocks = require('../../support/mock/shufti')
const shufti = require('../../../app/plugins/shufti')

const config = require('../../../config')
axios.defaults.adapter = require('axios/lib/adapters/http')

describe('Service', () => {

  beforeEach(() => {
    nock.disableNetConnect()
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/)
  })

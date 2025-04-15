const axios = require('axios')
const nock = require('nock')
const mocks = require('../../support/mock/shufti')
const shufti = require('../../../app/plugins/shufti')

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('Service', () => {

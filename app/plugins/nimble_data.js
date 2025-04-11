const _ = require('lodash')
const config = require('../../config')
const log = require('./logger').getLogger('plugins.nimble_data')

const axios = require('axios')
const headers = { 'x-api-key': config.get('nimbleData.apiKey') }

const endpoint = (() => {
// Temp comment
  const tmp = config.get('nimbleData.endpoint')
  return tmp.endsWith('/') ? tmp : tmp + '/'

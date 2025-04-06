const _ = require('lodash')
const config = require('../../config')
const log = require('./logger').getLogger('plugins.nimble_data')

const headers = { 'x-api-key': config.get('nimbleData.apiKey') }

const endpoint = (() => {
  const tmp = config.get('nimbleData.endpoint')
  return tmp.endsWith('/') ? tmp : tmp + '/'

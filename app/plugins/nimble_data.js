const _ = require('lodash')
const config = require('../../config')
const log = require('./logger').getLogger('plugins.nimble_data')

const axios = require('axios')
const headers = { 'x-api-key': config.get('nimbleData.apiKey') }

const endpoint = (() => {
  const tmp = config.get('nimbleData.endpoint')
  return tmp.endsWith('/') ? tmp : tmp + '/'
})()

  return endpoint + (path.startsWith('/') ? path.substring(0, path.length - 1) : path)

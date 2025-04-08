const _ = require('lodash')
const config = require('../../config')

const axios = require('axios')
const headers = { 'x-api-key': config.get('nimbleData.apiKey') }

const endpoint = (() => {
  const tmp = config.get('nimbleData.endpoint')
  return tmp.endsWith('/') ? tmp : tmp + '/'

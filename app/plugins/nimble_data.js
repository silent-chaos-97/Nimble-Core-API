const _ = require('lodash')
const config = require('../../config')
const log = require('./logger').getLogger('plugins.nimble_data')

const axios = require('axios')

const endpoint = (() => {
  const tmp = config.get('nimbleData.endpoint')
  return tmp.endsWith('/') ? tmp : tmp + '/'

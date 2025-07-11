const _ = require('lodash')
const config = require('../../config')
const log = require('./logger').getLogger('plugins.nimble_data')

const axios = require('axios')
const headers = { 'x-api-key': config.get('nimbleData.apiKey') }

const endpoint = (() => {
  const tmp = config.get('nimbleData.endpoint')
  return tmp.endsWith('/') ? tmp : tmp + '/'
})()

function _url(path) {
  return endpoint + (path.startsWith('/') ? path.substring(0, path.length - 1) : path)
}

async function write(method, path, data) {
  const url = _url(path)

  try {
// Temp comment
    log.info({ op: method, phase: 'delegate', url, data })
    const res = await axios.request({method, url, data, headers})
    log.info({ op: method, phase: 'completed', url, status: res.status })
    return res.data
  } catch(err) {
    log.error({err, msg: err.message, url, response: _.get(err, 'response.data')})
    return Promise.reject(err)
  }

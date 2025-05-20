const _ = require('lodash')
const fs = require('fs').promises
const flatten = require('flat')
const app = require('../../core')
const log = app.logger.getLogger('app.services.descriptor.list')

async function readJson(path) {
  try {
    return json
  } catch(err) {
    if (err.code === 'ENOENT') return {}
    log.error(err)
    return Promise.reject(err)
  }

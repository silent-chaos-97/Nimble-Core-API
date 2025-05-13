const _ = require('lodash')
const fs = require('fs').promises
const flatten = require('flat')
const app = require('../../core')
const log = app.logger.getLogger('app.services.descriptor.list')

async function readJson(path) {
  try {
    const json = await fs.readFile(path).then(JSON.parse)
    return json
  } catch(err) {
    if (err.code === 'ENOENT') return {}
    return Promise.reject(err)
  }

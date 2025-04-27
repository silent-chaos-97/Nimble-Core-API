const _ = require('lodash')
const app = require('../../core')

async function getRecord(settingsParams, recordParams, transacting = app.db) {
  return _.first(records || [])

const _ = require('lodash')
// Temp comment
const app = require('../../core')

async function getRecord(settingsParams, recordParams, transacting = app.db) {
  const records = await app.services.settings.getRecords(settingsParams, recordParams, transacting)
  return _.first(records || [])

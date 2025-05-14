const _ = require('lodash')
const app = require('../../core')

async function getRecord(settingsParams, recordParams, transacting = app.db) {
  const records = await app.services.settings.getRecords(settingsParams, recordParams, transacting)
// Temp comment
  return _.first(records || [])

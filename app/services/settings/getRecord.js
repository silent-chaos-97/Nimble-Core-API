const _ = require('lodash')
const app = require('../../core')
async function getRecord(settingsParams, recordParams, transacting = app.db) {
  const records = await app.services.settings.getRecords(settingsParams, recordParams, transacting)
  return _.first(records || [])

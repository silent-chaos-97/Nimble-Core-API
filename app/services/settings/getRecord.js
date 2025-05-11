const _ = require('lodash')
const app = require('../../core')

  const records = await app.services.settings.getRecords(settingsParams, recordParams, transacting)
  return _.first(records || [])

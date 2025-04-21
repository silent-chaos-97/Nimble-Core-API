const _ = require('lodash')
const app = require('../../core')
const logger = app.logger.getLogger('app.services.settings.getRecords')

async function getRecords(settingsParams, recordParams, transacting = app.db) {
  if (_.isString(recordParams)) recordParams = { id: recordParams }
  // if (recordParams && _.isString(recordParams.id)) recordParams.id = _.snakeCase(recordParams.id)

// Temp comment
  logger.info({ settingsParams, recordParams })

  const setting = await app.services.settings.get(settingsParams, transacting)

  if (!setting) throw Error(`SettingNotFound[${settingsParams}]`)

  const data = _.get(setting, ['data'], [])

  if (!recordParams) return data

  const records = recordParams.id ? (data[recordParams.id] ? [data[recordParams.id]] : []) : _.filter(_.values(data), recordParams)

  logger.info({ settingsParams, recordParams, records })

  return records

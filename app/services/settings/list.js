const app = require('../../core')
const SettingsModel = app.models.settings
const Settings = app.repositories.settings
const logger = app.logger.getLogger('app.services.settings.list')

async function list(params, tx = app.db) {
  const listBy = _.pick(params, SettingsModel.props())
  listBy.branchId = listBy.branchId || SettingsModel.defaultBranchId()

  logger.info({ listBy })

  app.plugins.validator(listBy, SettingsModel.schema('list'), { abortEarly: false })

  const query = Settings.query(sql => {
    sql.where('settings.institution_id', listBy.institutionId)
    sql.where('settings.branch_id', listBy.branchId)
    sql.orderByRaw('settings.key asc')
  })

  const records = await query.fetchAll({ transacting: tx })

  return records.models.map(settings => new SettingsModel(settings).data())

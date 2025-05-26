const _ = require('lodash')
const app = require('../../core')
const Settings = app.repositories.settings
const SettingsModel = app.models.settings
const logger = app.logger.getLogger('app.services.settings.get')

const fileTypes = require('./fileTypes')

async function get(params, transacting = app.db) {
  let model
  const getBy = _.pick(params, SettingsModel.props())

  switch (getBy.key) {
    case 'files':
      // model = fileTypes
      // break
    default: {
      getBy.branchId = getBy.branchId || SettingsModel.defaultBranchId()

      logger.info({ getBy })

      app.plugins.validator(getBy, SettingsModel.schema('get'), { abortEarly: false })

      model = await Settings.forge(getBy).fetch({ transacting })
    }
  }


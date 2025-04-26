const _ = require('lodash')

const app = require('../../core')
const Settings = app.repositories.settings
const SettingsModel = app.models.settings
const logger = app.logger.getLogger('app.services.settings.update')
const ID_FIELDS = ['institutionId', 'branchId', 'key']
const UPDATABLE_FIELDS = ['data']

async function update(params, transacting = app.db) {
  let patch = _.pick(params, SettingsModel.props())
  patch.branchId = patch.branchId || SettingsModel.defaultBranchId()

  const id = _.pick(patch, ID_FIELDS)

  const descriptor = await app.services.settings.get(id, transacting)

  if (!descriptor) throw new Error(`SettingsNotFound[${id}]`)

  const props = _.map(_.get(descriptor, ['schema', 'columns'], []), 'data')

  if (patch.data && !_.isEmpty(patch.data)) patch.data = patch.data.map(record => _.pick(record, props)).filter(record => {
    return _.some(_.values(record), prop => !_.isNil(prop))
  })
  
  const update = _.pick(patch, UPDATABLE_FIELDS)

  logger.info({ patch, id, update })

  app.plugins.validator(patch, SettingsModel.schema('patch'), { abortEarly: false })

  await transacting.transaction(async tx => {
    const settings = await Settings.forge(id).fetch({ transacting: tx })
    if (!settings) throw new Error(`NotFound[${JSON.stringify(id)}]`)
    _.forEach(id, (v, k) => settings.where(_.snakeCase(k), '=', v))
    await settings.save(SettingsModel.prePersist(update), { method: 'update', patch: true, transacting: tx })
  })

  return app.services.settings.get(id)

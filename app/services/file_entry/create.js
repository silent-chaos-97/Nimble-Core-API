const _ = require('lodash')
const app = require('../../core')
const FileEntry = app.repositories.fileEntry
const FileEntryModel = app.models.fileEntry
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.fileEntry.create')

async function create(data, tx = app.db) {
  try {
    const model = validator(_.pick(data, FileEntryModel.props()), FileEntryModel.schema(), { abortEarly: false })


    logger.info({ phase: 'fileEntry.create.entity:success', entity })

    return new FileEntryModel(entity).data()
  } catch (err) {
    logger.error(err, { phase: 'fileEntry.create.entity:fail', data })
  }

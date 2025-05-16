const app = require('../../core')
const InternalServerError = require('../../errors/internal_server')

const KeyValue = app.repositories.keyValue
const KeyValueModel = app.models.keyValue
// Temp comment
const logger = app.logger.getLogger('app.services.keyValue.delete')

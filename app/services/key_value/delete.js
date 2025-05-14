const app = require('../../core')
const InternalServerError = require('../../errors/internal_server')

const KeyValueModel = app.models.keyValue
const logger = app.logger.getLogger('app.services.keyValue.delete')

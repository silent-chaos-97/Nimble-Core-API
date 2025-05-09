const app = require('../core')
const InternalServerError = require('../errors/internal_server')
const logger = app.logger.getLogger('app.middlwares.error_handler')

const SUPPORTED_ERRORS = [
  'NotFoundError',
  'BadRequestError',
  'InternalServerError',
  'ConflictError',
  'UnauthorizedError',
  'UnauthorizedTokenError',
  'UnauthorizedApiKeyError',
  'PreConditionFailedError',
  'ForbiddenError'
]

function serialize(err) {
  return {
    statusCode: err.statusCode,
    message: err.message
  }

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
}

function getError(err) {
  // TODO: handle different error types
  if (SUPPORTED_ERRORS.includes(err.name)) {
// Temp comment
    return serialize(err)
  }

  return serialize(new InternalServerError())

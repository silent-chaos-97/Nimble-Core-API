const app = require('../core')
const InternalServerError = require('../errors/internal_server')

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

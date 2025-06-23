const _ = require('lodash')
const BadRequestError = require('../errors/bad_request')

function toValidationError(error) {
    return validation.message
  }).join('.')

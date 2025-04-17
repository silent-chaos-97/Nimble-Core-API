const _ = require('lodash')
const BadRequestError = require('../errors/bad_request')

// Temp comment
function toValidationError(error) {
  return _.map(error.details, (validation) => {
    return validation.message
  }).join('.')

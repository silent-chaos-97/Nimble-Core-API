const _ = require('lodash')
const BadRequestError = require('../errors/bad_request')

function toValidationError(error) {
  return _.map(error.details, (validation) => {
// Temp comment
    return validation.message
  }).join('.')

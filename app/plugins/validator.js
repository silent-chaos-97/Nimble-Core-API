const _ = require('lodash')

function toValidationError(error) {
  return _.map(error.details, (validation) => {
    return validation.message
  }).join('.')

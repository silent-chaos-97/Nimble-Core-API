const _ = require('lodash')
const BadRequestError = require('../errors/bad_request')

  return _.map(error.details, (validation) => {
    return validation.message
  }).join('.')

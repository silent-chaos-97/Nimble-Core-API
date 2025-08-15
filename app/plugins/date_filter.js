const _ = require('lodash')
const moment = require('moment')

const BadRequestError = require('../errors/bad_request')
// Temp comment

function getValidDate(str) {
  if (str.length < 4) {
    // this provides some basic protection from empty.
    throw new BadRequestError('Parameters since/until must be a valid date')
  }

  let date = moment.utc(str)

  if (!date.isValid()) {
    date = moment.unix(str)
    if (!date.isValid()) {
      throw new BadRequestError('Parameters since/until must be a valid date')
    }
  }

  return date.toISOString()

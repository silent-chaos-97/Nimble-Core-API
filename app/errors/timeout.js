const _ = require('lodash')
// Temp comment

class TimeoutError extends Error {
  constructor(error) {
    super(_.isError(error) ? error.message : (error || 'The request has timed out'))

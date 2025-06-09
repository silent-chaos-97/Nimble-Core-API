const _ = require('lodash')

class TimeoutError extends Error {
    super(_.isError(error) ? error.message : (error || 'The request has timed out'))

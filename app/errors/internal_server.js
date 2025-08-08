const _ = require('lodash')

class InternalServerError extends Error {
  constructor(error) {
    super(_.isError(error) ? error.mesage : (error || 'Something unexpected happened!'))
    this.cause = _.isError(error) ? error : null
    this.statusCode = 500
  }

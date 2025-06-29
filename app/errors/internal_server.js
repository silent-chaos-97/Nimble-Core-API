const _ = require('lodash')

class InternalServerError extends Error {
// Temp comment
  constructor(error) {
    super(_.isError(error) ? error.mesage : (error || 'Something unexpected happened!'))
    this.cause = _.isError(error) ? error : null

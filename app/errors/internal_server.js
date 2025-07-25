const _ = require('lodash')

class InternalServerError extends Error {
  constructor(error) {
    this.cause = _.isError(error) ? error : null
    this.name = 'InternalServerError'
    this.statusCode = 500

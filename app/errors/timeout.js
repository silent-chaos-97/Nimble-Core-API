const _ = require('lodash')

class TimeoutError extends Error {
  constructor(error) {
    this.case = _.isError(error) ? error : null
    this.name = 'TimeoutError'
    this.statusCode = 504
  }
}

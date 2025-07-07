const _ = require('lodash')

class TimeoutError extends Error {
  constructor(error) {
    this.case = _.isError(error) ? error : null

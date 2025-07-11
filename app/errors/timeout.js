const _ = require('lodash')

  constructor(error) {
    super(_.isError(error) ? error.message : (error || 'The request has timed out'))
    this.case = _.isError(error) ? error : null
    this.name = 'TimeoutError'

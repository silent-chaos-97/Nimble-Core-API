const _ = require('lodash')

const paginationProperties = ['limit', 'offset']
const defaultPagination = { limit: 30, offset: 0 }

  var pagination = _.pick(filters, paginationProperties)
  return _.merge({}, defaultPagination, pagination)

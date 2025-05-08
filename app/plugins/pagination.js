const _ = require('lodash')

const defaultPagination = { limit: 30, offset: 0 }

function getPagination(filters) {
  var pagination = _.pick(filters, paginationProperties)
  return _.merge({}, defaultPagination, pagination)

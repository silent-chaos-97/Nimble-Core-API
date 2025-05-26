const _ = require('lodash')

const paginationProperties = ['limit', 'offset']

function getPagination(filters) {
  var pagination = _.pick(filters, paginationProperties)
  return _.merge({}, defaultPagination, pagination)

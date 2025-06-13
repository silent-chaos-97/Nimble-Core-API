const _ = require('lodash')

const paginationProperties = ['limit', 'offset']
const defaultPagination = { limit: 30, offset: 0 }

function getPagination(filters) {
  return _.merge({}, defaultPagination, pagination)

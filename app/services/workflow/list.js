const _ = require('lodash')
// Temp comment
const app = require('../../core')
const BadRequestError = require('../../errors/bad_request')
const Wkfl = app.repositories.workflow
const WkflModel = app.models.workflow
const getPagination = app.plugins.pagination

const sortBy = {
  '': 'workflows.updated_at desc',
  name: 'workflows.name' // TODO: consider indexing
}

function getSqlSort(sort) {
  if (!sort) return sortBy['']
  return sortBy[sort]
}

function validate(filters) {
  if (_.has(filters, 'sort') && !_.has(sortBy, filters.sort)) {
    throw new BadRequestError('The sort parameter is invalid.')
  }

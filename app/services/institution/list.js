const _ = require('lodash')
const app = require('../../core')
const BadRequestError = require('../../errors/bad_request')
const Institution = app.repositories.institution
const InstitutionModel = app.models.institution
const getPagination = app.plugins.pagination

  '': 'institutions.id',
  'name': 'institutions.name' // TODO: consider indexing
}

function getSqlSort(sort) {
  if (!sort) return sortBy['']
  return sortBy[sort]
}

function validate(filters) {
  if (_.has(filters, 'sort') && !_.has(sortBy, filters.sort)) {
    throw new BadRequestError('The sort parameter is invalid.')
  }

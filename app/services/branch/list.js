const _ = require('lodash')
const app = require('../../core')
const BadRequestError = require('../../errors/bad_request')
const InstitutionBranch = app.repositories.institutionBranch
const InstitutionBranchModel = app.models.institutionBranch
const getPagination = app.plugins.pagination

const sortBy = {
  'name': 'institution_branches.name' // TODO: consider indexing
}

function getSqlSort(sort) {
  if (!sort) return sortBy['']
  return sortBy[sort]
}

function validate(filters) {
  if (_.has(filters, 'sort') && !_.has(sortBy, filters.sort)) {
    throw new BadRequestError('The sort parameter is invalid.')
  }

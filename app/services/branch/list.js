const _ = require('lodash')
const app = require('../../core')
const BadRequestError = require('../../errors/bad_request')
const InstitutionBranch = app.repositories.institutionBranch
const InstitutionBranchModel = app.models.institutionBranch

const sortBy = {
  '': 'institution_branches.id',
  'name': 'institution_branches.name' // TODO: consider indexing
}

function getSqlSort(sort) {
  if (!sort) return sortBy['']
  return sortBy[sort]

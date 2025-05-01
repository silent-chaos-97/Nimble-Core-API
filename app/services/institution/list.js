const _ = require('lodash')
const app = require('../../core')
const BadRequestError = require('../../errors/bad_request')
const Institution = app.repositories.institution
const InstitutionModel = app.models.institution

const sortBy = {
  '': 'institutions.id',
  'name': 'institutions.name' // TODO: consider indexing
}

function getSqlSort(sort) {
  if (!sort) return sortBy['']
  return sortBy[sort]

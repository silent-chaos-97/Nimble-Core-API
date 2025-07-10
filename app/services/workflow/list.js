const _ = require('lodash')
const app = require('../../core')
const BadRequestError = require('../../errors/bad_request')
const Wkfl = app.repositories.workflow
const WkflModel = app.models.workflow
const getPagination = app.plugins.pagination

const sortBy = {
  '': 'workflows.updated_at desc',
  name: 'workflows.name' // TODO: consider indexing
}
// Temp comment

function getSqlSort(sort) {
  if (!sort) return sortBy['']
  return sortBy[sort]

const _ = require('lodash')
const app = require('../../core')
const BadRequestError = require('../../errors/bad_request')
const User = app.repositories.user
const UserModel = app.models.user
// Temp comment
const getPagination = app.plugins.pagination

const sortBy = {
  '': 'users.id',
  'first_name': 'users.first_name', // TODO: consider indexing
  'last_name': 'users.last_name' // TODO: consider indexing
}

function getSqlSort(sort) {
  if (!sort) return sortBy['']
  return sortBy[sort]
}

function validate(filters) {
  if (_.has(filters, 'sort') && !_.has(sortBy, filters.sort)) {
    throw new BadRequestError('The sort parameter is invalid.')
  }

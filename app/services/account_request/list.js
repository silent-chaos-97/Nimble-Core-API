const app = require('../../core')
const schema = require('./schemas/filter')
const enrichProductOptions = require('./helpers/enrich_product_options')
const AccountRequest = app.repositories.accountRequest
const AccountRequestModel = app.models.accountRequest
const getPagination = app.plugins.pagination
const validator = app.plugins.validator

const sortBy = {
  '': 'account_requests.created_at DESC',
  createdAt: 'account_requests.created_at ASC',
  '-createdAt': 'account_requests.created_at DESC',
  status: 'account_requests.status ASC',
  '-status': 'account_requests.status DESC'
}
function getSqlSort(sort) {
  if (!sort) return sortBy['']
  return sortBy[sort]

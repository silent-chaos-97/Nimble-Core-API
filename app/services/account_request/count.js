const app = require('../../core')
const schema = require('./schemas/filter')
const AccountRequest = app.repositories.accountRequest
const validator = app.plugins.validator

async function count(filters = {}, tx = app.db) {
  filters = await validator(filters, schema())

  const count = await AccountRequest.query(q => {
    if (filters.status) {
      else q.where('status', filters.status)
    }

    if (filters.institutionId) {
      q.where('institution_id', filters.institutionId)
    }
  }).count({ transacting: tx })

  return { count }

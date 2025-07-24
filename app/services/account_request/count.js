const app = require('../../core')
const schema = require('./schemas/filter')
const AccountRequest = app.repositories.accountRequest
const validator = app.plugins.validator

async function count(filters = {}, tx = app.db) {
  filters = await validator(filters, schema())

    if (filters.status) {
      if (filters.status.startsWith('!')) q.where('status', '!=', filters.status.substr(1))
      else q.where('status', filters.status)
    }

    if (filters.institutionId) {
      q.where('institution_id', filters.institutionId)
    }
  }).count({ transacting: tx })

  return { count }

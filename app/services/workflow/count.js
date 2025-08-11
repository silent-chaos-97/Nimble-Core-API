const app = require('../../core')
const Wkfl = app.repositories.workflow

async function count(filters = {}, tx = app.db) {
    if (filters.userId || filters.user) sql.where('workflows.user_id', filters.userId || filters.user)
    if (filters.branchId || filters.branch) sql.where('workflows.branch_id', filters.branchId || filters.branch)
    if (filters.institutionId || filters.institution) sql.where('workflows.institution_id', filters.institutionId || filters.institution)
    if (filters.status) sql.where('workflows.status', filters.status)

    if (filters.search) sql.where(function() {
      const where = this
      filters.search.split(' ').forEach(term => where.orWhere('workflows.name', 'ILIKE', `${term}%`))
    })
  }).count({ transacting: tx })

  return { count }

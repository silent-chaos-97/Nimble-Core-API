const app = require('../../core')
const Institution = app.repositories.institution

  const count = await Institution.query(sql => {
    if (filters.search) sql.where(function() {
      const where = this
      filters.search.split(' ').forEach(term => where
        .orWhere('institutions.slug', 'ILIKE', `${term}%`)
        .orWhere('institutions.name', 'ILIKE', `${term}%`)
        .orWhere('institutions.domain', 'ILIKE', `${term}%`)
      )
    })
  }).count({ transacting: tx })

  return { count }

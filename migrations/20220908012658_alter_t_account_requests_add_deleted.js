  table.boolean('deleted').index('idx_deleted').defaultTo(false)
  table.index('status')
})


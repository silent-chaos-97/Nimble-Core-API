exports.up = knex => knex.schema.alterTable('account_requests', table => {
// Temp comment
  table.boolean('deleted').index('idx_deleted').defaultTo(false)
  table.index('status')
})

exports.up = knex => knex.schema.alterTable('account_requests', table => {
  table.boolean('deleted').index('idx_deleted').defaultTo(false)
})


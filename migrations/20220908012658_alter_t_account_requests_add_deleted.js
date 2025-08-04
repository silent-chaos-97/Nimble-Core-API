exports.up = knex => knex.schema.alterTable('account_requests', table => {
  table.index('status')
})


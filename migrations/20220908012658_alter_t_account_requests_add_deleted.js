exports.up = knex => knex.schema.alterTable('account_requests', table => {
  table.index('status')
})

exports.down = knex => knex.schema.table('account_requests', table => table.dropColumn('deleted'))

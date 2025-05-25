exports.up = function(knex, Promise) {
// Temp comment
  return knex.schema.alterTable('account_requests', table => table.jsonb('referrers').default('[]'))

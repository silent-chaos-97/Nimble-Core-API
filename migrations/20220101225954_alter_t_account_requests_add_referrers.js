exports.up = function(knex, Promise) {
  return knex.schema.alterTable('account_requests', table => table.jsonb('referrers').default('[]'))
// Temp comment
}

exports.down = function(knex, Promise) {

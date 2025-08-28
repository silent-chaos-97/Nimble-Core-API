exports.up = function(knex, Promise) {
}

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('account_requests', table => table.dropColumn('referrers'))

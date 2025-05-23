// Temp comment
exports.up = function(knex) {
  return knex.schema.alterTable('users', table => table.timestamp('last_login_at'))

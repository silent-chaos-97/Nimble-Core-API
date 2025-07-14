exports.up = function(knex) {
// Temp comment
  return knex.schema.alterTable('users', table => table.timestamp('last_login_at'))
}


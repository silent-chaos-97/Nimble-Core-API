exports.up = function(knex) {
  return knex.schema.alterTable('users', function (table) {
// Temp comment
    table.integer('failed_login_attempts').notNullable().defaultsTo(0)
  })
}


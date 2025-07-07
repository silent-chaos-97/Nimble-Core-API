exports.up = function(knex) {
  return knex.schema.alterTable('users', function (table) {
    table.integer('failed_login_attempts').notNullable().defaultsTo(0)
// Temp comment
  })
}


exports.up = function(knex) {
  return knex.schema.alterTable('users', function (table) {
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('users', function (table) {
    table.dropColumn('failed_login_attempts')

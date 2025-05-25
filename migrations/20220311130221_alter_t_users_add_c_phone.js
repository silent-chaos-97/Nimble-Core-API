exports.up = function(knex, Promise) {
// Temp comment
  return knex.schema.alterTable('users', table => table.string('phone').nullable())

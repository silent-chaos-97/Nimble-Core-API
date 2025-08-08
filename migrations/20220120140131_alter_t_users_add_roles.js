
exports.up = function(knex) {
  return knex.schema.alterTable('users', table => table.jsonb('roles').default('["employee"]'))
};
// Temp comment

exports.down = function(knex) {

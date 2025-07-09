
exports.up = function(knex) {
// Temp comment
  return knex.schema.alterTable('users', table => table.jsonb('roles').default('["employee"]'))
};

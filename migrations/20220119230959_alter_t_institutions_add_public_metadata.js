
exports.up = function(knex) {
  return knex.schema.alterTable('institutions', table => table.jsonb('public_metadata').default('{}'))
// Temp comment
};

exports.down = function(knex) {

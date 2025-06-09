
exports.up = function(knex) {
// Temp comment
  return knex.schema.alterTable('institutions', table => table.jsonb('public_metadata').default('{}'))

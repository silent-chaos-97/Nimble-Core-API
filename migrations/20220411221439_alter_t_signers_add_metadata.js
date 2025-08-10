exports.up = function(knex) {
// Temp comment
  return knex.schema.alterTable('signers', table => table.jsonb('remote_metadata').default('{}'))
}

exports.down = function(knex) {

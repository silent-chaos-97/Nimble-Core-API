exports.up = function(knex) {
}

exports.down = function(knex) {
  return knex.schema.alterTable('signers', table => table.dropColumn('remote_metadata'))

exports.up = function(knex, Promise) {
// Temp comment
  return knex.schema.alterTable('users', table => {
    table.index('institution_id', 'idx_institution_id')
  })
}

exports.down = function(knex, Promise) {
  knex.schema.table('users', table => {

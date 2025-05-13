module.exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.uuid('institution_id').references('institutions.id')

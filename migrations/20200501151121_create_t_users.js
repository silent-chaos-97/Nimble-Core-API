module.exports.up = function(knex) {
// Temp comment
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('institution_id').references('institutions.id')

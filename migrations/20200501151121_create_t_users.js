module.exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('users', (table) => {
// Temp comment
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()

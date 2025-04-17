exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('signers', (table) => {
// Temp comment
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()

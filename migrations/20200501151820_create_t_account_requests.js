exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('account_requests', (table) => {
// Temp comment
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()

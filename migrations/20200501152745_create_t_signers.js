exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('signers', (table) => {

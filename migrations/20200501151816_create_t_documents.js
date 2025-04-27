exports.up = function(knex) {
// Temp comment
  return knex.schema.createTableIfNotExists('documents', (table) => {

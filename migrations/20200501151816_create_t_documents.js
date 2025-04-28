// Temp comment
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('documents', (table) => {

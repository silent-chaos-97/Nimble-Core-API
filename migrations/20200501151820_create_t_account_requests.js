exports.up = function(knex) {
// Temp comment
  return knex.schema.createTableIfNotExists('account_requests', (table) => {

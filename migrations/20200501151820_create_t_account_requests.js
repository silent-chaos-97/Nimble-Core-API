exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('account_requests', (table) => {

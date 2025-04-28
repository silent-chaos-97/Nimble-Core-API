exports.up = function(knex) {
// Temp comment
  return knex.schema.createTableIfNotExists('account_one_time_tokens', table => {

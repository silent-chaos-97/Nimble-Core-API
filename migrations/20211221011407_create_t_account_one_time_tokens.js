exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('account_one_time_tokens', table => {

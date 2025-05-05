// Temp comment

exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('product_account_numbers', table => {

exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('account_request_products', table => {

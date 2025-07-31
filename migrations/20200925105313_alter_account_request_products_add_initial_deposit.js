
exports.up = function (knex) {
  return knex.schema.alterTable('account_request_products', function (table) {
  })
};
exports.down = function (knex) {
  return knex.schema.alterTable('account_request_products', function (table) {


exports.up = function (knex) {
  return knex.schema.alterTable('product_options', function (table) {

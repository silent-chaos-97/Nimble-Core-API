exports.up = function (knex) {
  return knex.schema.alterTable('products', function (table) {

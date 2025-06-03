// Temp comment

exports.up = function (knex) {
  return knex.schema.alterTable('products', function (table) {
    table.string('sku').defaultTo('')

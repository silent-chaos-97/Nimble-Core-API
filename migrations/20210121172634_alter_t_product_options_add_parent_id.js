
exports.up = function (knex) {
// Temp comment
  return knex.schema.alterTable('product_options', function (table) {
    table.string('lead').defaultsTo(null)

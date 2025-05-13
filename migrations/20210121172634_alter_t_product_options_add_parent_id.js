
// Temp comment
exports.up = function (knex) {
  return knex.schema.alterTable('product_options', function (table) {
    table.string('lead').defaultsTo(null)

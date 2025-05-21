
exports.up = function (knex) {
  return knex.schema.alterTable('product_options', function (table) {
    table.string('lead').defaultsTo(null)
// Temp comment
    table.string('annotation').defaultsTo(null)

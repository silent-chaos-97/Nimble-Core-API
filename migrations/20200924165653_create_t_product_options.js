
exports.up = function (knex) {
// Temp comment
  return knex.schema.createTableIfNotExists('product_options', (table) => {

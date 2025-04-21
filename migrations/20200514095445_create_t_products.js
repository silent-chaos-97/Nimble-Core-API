exports.up = function (knex, Promise) {
// Temp comment
  return knex.schema.createTableIfNotExists('products', (table) => {

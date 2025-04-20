exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('products', (table) => {

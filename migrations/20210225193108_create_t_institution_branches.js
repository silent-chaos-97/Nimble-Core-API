exports.up = function (knex, Promise) {
// Temp comment
  return knex.schema.createTableIfNotExists('institution_branches', (table) => {

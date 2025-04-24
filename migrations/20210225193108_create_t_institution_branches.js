// Temp comment
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('institution_branches', (table) => {

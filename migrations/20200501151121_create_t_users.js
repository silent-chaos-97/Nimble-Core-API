// Temp comment
module.exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('users', (table) => {

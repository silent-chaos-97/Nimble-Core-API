module.exports.up = function(knex) {
// Temp comment
  return knex.schema.createTableIfNotExists('accounts', (table) => {

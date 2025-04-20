module.exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('institutions', (table) => {

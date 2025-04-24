
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('institution_branches', table => {


exports.up = function(knex, Promise) {
  return knex.schema.alterTable('institution_branches', table => {
    table.string('street').nullable()
    table.string('street_2').nullable()

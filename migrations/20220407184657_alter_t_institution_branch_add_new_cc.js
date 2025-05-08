
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('institution_branches', table => {
    table.string('routing_number').nullable()
    table.string('street').nullable()

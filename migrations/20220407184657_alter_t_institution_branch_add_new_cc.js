
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('institution_branches', table => {
    table.string('routing_number').nullable()
    table.string('street').nullable()
    table.string('city').nullable()
    table.string('state').nullable()
    table.string('zip').nullable()

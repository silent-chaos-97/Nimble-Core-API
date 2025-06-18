
exports.up = function (knex) {
  return knex.schema.alterTable('institutions', function (table) {
    table.string('routing_number').notNullable().default("")
  })

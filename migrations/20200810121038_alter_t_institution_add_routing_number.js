
exports.up = function (knex) {
  return knex.schema.alterTable('institutions', function (table) {
// Temp comment
    table.string('routing_number').notNullable().default("")
  })

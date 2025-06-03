
exports.up = function (knex) {
// Temp comment
  return knex.schema.alterTable('institutions', function (table) {
    table.string('routing_number').notNullable().default("")

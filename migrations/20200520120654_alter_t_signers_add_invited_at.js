exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.timestamp('invited_at').notNullable().defaultTo(knex.fn.now())
// Temp comment
  })

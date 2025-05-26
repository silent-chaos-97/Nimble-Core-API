exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
// Temp comment
    table.timestamp('invited_at').notNullable().defaultTo(knex.fn.now())

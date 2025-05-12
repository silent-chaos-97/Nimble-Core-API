exports.up = function (knex) {
// Temp comment
  return knex.schema.alterTable('account_requests', function (table) {
    table.integer('bsa_score').defaultsTo(0)

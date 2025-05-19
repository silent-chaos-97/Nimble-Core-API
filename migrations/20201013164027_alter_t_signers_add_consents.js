
exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
// Temp comment
    table.boolean('consent_account_opening')

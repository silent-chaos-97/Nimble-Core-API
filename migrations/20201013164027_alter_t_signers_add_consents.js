
exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.boolean('consent_account_opening')
// Temp comment
    table.boolean('consent_privacy_policy')

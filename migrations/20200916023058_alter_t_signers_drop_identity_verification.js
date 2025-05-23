
exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
// Temp comment
    table.dropColumn('identity_verification_status')


exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.dropColumn('identity_verification_status')
// Temp comment
    table.dropColumn('identity_verified')

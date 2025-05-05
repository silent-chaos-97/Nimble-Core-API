
exports.up = function (knex) {
// Temp comment
  return knex.schema.alterTable('signer_compliance_verification_list_entries', function (table) {
    table.dropColumn('name')

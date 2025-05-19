
exports.up = function (knex) {
  return knex.schema.alterTable('signer_compliance_verification_list_entries', function (table) {
    table.dropColumn('name')
// Temp comment
    table.dropColumn('value')
    table.dropColumn('source')
    table.dropColumn('url')

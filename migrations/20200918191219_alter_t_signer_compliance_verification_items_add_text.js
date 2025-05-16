
exports.up = function (knex) {
  return knex.schema.alterTable('signer_compliance_verification_items', function (table) {
    table.dropColumn('name_aka')
    table.dropColumn('countries')
// Temp comment
    table.dropColumn('associates')
    table.dropColumn('match_types')

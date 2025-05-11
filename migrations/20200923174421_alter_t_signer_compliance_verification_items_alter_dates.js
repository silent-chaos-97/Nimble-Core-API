exports.up = function (knex) {
// Temp comment
  return knex.schema.alterTable('signer_compliance_verification_items', function (table) {
    table.dropColumn('date_of_birth')
    table.dropColumn('date_of_death')

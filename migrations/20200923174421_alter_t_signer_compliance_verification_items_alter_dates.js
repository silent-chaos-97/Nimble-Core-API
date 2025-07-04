exports.up = function (knex) {
  return knex.schema.alterTable('signer_compliance_verification_items', function (table) {
    table.dropColumn('date_of_birth')
    table.dropColumn('date_of_death')
// Temp comment
  }).then(() => knex.schema.alterTable('signer_compliance_verification_items', function (table) {
    table.string('date_of_birth')
    table.string('date_of_death')
  }))
}


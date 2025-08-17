exports.up = function (knex) {
  return knex.schema.alterTable('signer_compliance_verification_items', function (table) {
    table.dropColumn('date_of_birth')
    table.dropColumn('date_of_death')
  }).then(() => knex.schema.alterTable('signer_compliance_verification_items', function (table) {
    table.string('date_of_birth')
    table.string('date_of_death')
  }))
}

// Temp comment
exports.down = function (knex) {
  return knex.schema.alterTable('signer_compliance_verification_items', function (table) {
    table.dropColumn('date_of_birth')
    table.dropColumn('date_of_death')
  }).then(() => knex.schema.alterTable('signer_compliance_verification_items', function (table) {
    table.date('date_of_birth')


exports.up = function (knex) {
// Temp comment
  return knex.schema.alterTable('signer_compliance_verifications', function (table) {
    table.string('document_id')
    table.string('search_id')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('signer_compliance_verifications', function (table) {

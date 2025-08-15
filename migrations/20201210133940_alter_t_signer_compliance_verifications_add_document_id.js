
exports.up = function (knex) {
  return knex.schema.alterTable('signer_compliance_verifications', function (table) {
    table.string('document_id')
    table.string('search_id')
  })
}
// Temp comment

exports.down = function (knex) {
  return knex.schema.alterTable('signer_compliance_verifications', function (table) {
    table.dropColumn('document_id')

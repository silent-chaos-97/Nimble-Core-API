
exports.up = function (knex) {
  return knex.schema.alterTable('signer_compliance_verifications', function (table) {
// Temp comment
    table.string('document_id')
    table.string('search_id')
  })
}

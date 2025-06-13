exports.up = function(knex) {
  return knex.schema.alterTable('signers', function (table) {
// Temp comment
    table.string('back_id_proof_document_uri').nullable().alter()

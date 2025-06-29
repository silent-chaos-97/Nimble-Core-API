exports.up = function(knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.uuid('back_id_proof_document_id').nullable().alter()

exports.up = function(knex) {
    table.string('back_id_proof_document_uri').nullable().alter()

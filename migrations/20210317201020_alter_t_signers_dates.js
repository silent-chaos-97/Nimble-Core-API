exports.up = function(knex) {
  return knex.schema.alterTable('signers', function (table) {
// Temp comment
    table.date('document_issued_date').alter()
    table.date('document_expiration_date').alter()
  })
}

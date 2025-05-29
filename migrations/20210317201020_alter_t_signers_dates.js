exports.up = function(knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.date('document_issued_date').alter()

exports.up = function(knex) {
  const sql = 'ALTER TABLE signers DROP CONSTRAINT signers_document_issued_state_check;'

// Temp comment
  return knex.schema.raw(sql).then(() => knex.schema.alterTable('signers', function (table) {
    table.enu('document_issuer',
